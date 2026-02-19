// server.js (CommonJS)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// MongoDB Connection
// ======================
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));


// ======================
// User Schema & Model (Doctor)
// ======================
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// ======================
// Patient Schema & Model
// ======================
const patientSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientId: { type: String, unique: true, sparse: true },
  caseId: String,
  fullName: String,
  age: Number,
  gender: String,
  medicalHistory: String,
  contactInfo: String,
  reports: { type: Array, default: [] }, // placeholder for analysis reports
  createdAt: { type: Date, default: Date.now },
});

// Pre-save: auto-generate patientId
patientSchema.pre("save", function (next) {
  if (this.patientId) return next();
  const idPart = mongoose.Types.ObjectId().toHexString().slice(-6).toUpperCase();
  const timePart = Date.now().toString().slice(-6);
  this.patientId = `PAT-${idPart}-${timePart}`;
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

// ======================
// Helper: get doctorId from Bearer token or body
// ======================
function getDoctorIdFromRequest(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
      if (payload && payload.id) return payload.id;
    } catch (err) {
      return null;
    }
  }
  if (req.body && req.body.doctorId) return req.body.doctorId;
  return null;
}

// ======================
// Auth Routes
// ======================
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretKey", { expiresIn: "1h" });

    res.json({
      message: "✅ Login successful",
      token,
      doctorId: user._id,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// Patient Routes
// ======================

// Add patient
app.post("/api/patients/add", async (req, res) => {
  try {
    const doctorId = getDoctorIdFromRequest(req);
    if (!doctorId) return res.status(401).json({ message: "Doctor not authenticated or doctorId missing" });

    const { caseId, patientId, fullName, age, gender, medicalHistory, contactInfo } = req.body;

    const newPatient = new Patient({
      doctorId,
      patientId: patientId || undefined,
      caseId,
      fullName,
      age,
      gender,
      medicalHistory,
      contactInfo,
    });

    await newPatient.save();

    res.json({ message: "✅ Patient added successfully", patient: newPatient });
  } catch (error) {
    console.error("Add Patient Error:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.patientId) {
      return res.status(400).json({ message: "Generated patientId collision — try again" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Get all patients for doctor (with optional search)
app.get("/api/patients", async (req, res) => {
  try {
    const doctorId = getDoctorIdFromRequest(req) || req.query.doctorId;
    if (!doctorId) return res.status(401).json({ message: "Doctor not authenticated" });

    const { search } = req.query;
    let query = { doctorId };

    if (search) {
      query.$or = [
        { patientId: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ];
    }

    const patients = await Patient.find(query).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    console.error("Fetch Patients Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get patients for logged-in doctor
app.get("/api/patients/me", async (req, res) => {
  try {
    const doctorId = getDoctorIdFromRequest(req);
    if (!doctorId) return res.status(401).json({ message: "Doctor not authenticated" });

    const patients = await Patient.find({ doctorId }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    console.error("Fetch Patients (me) Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single patient by ID
app.get("/api/patients/single/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    console.error("Fetch Single Patient Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get patients by doctorId (keep this LAST so it doesn't clash with /me or /single)
app.get("/api/patients/:doctorId", async (req, res) => {
  try {
    const patients = await Patient.find({ doctorId: req.params.doctorId }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    console.error("Fetch Patients Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// Dashboard test route
// ======================
app.get("/api/dashboard", (req, res) => {
  res.json({ message: "Welcome to the Dashboard!" });
});

/// ======================
// Analysis Routes
// ======================

// ✅ Get all analyses for a doctor's patients (must come BEFORE /:patientId)
app.get("/api/analysis/all", async (req, res) => {
  try {
    const doctorId = req.query.doctorId || getDoctorIdFromRequest(req);
    if (!doctorId) {
      return res.status(401).json({ message: "Doctor not authenticated" });
    }

    // Get all patients for this doctor
    const patients = await Patient.find({ doctorId }).select("_id");
    const patientIds = patients.map((p) => p._id.toString());

    if (patientIds.length === 0) {
      return res.json([]); // always return array
    }

    // Fetch analyses
    const analyses = await mongoose.connection.db
      .collection("analysis")
      .find({ patientId: { $in: patientIds } })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(analyses || []);
  } catch (error) {
    console.error("Fetch All Analyses Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get analysis by single patientId
app.get("/api/analysis/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const analysis = await mongoose.connection.db
      .collection("analysis")
      .find({ patientId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(analysis || []); // always return array
  } catch (error) {
    console.error("Fetch Analysis Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
