import React, { useState } from 'react';
import { FaUserMd, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Re-using the logo component
const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 5C22.9086 5 5 22.9086 5 45V45H45V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 5H95V45H55V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M5 55H45V95H5V55Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 95C77.0914 95 95 77.0914 95 55V55H55V95Z" stroke="#1E3A8A" strokeWidth="6"/>
  </svg>
);

const AddPatientStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
  }

  body, html, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
    color: #1E293B;
  }

  #add-patient-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .add-patient-container {
    width: 100%;
    max-width: 1200px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
    padding: 40px;
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .add-patient-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 24px;
    margin-bottom: 40px;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .logo-area .company-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1E3A8A;
    letter-spacing: -0.025em;
  }

  .logo-area .tagline {
    font-size: 0.875rem;
    color: #64748B;
    margin-top: 2px;
    font-weight: 400;
  }

  .main-nav {
    display: flex;
    gap: 32px;
  }

  .main-nav a {
    text-decoration: none;
    color: #475569;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s ease;
    position: relative;
  }

  .main-nav a:hover {
    color: #1E3A8A;
  }

  .main-nav a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #06B6D4;
    transition: width 0.2s ease;
  }

  .main-nav a:hover::after {
    width: 100%;
  }

  .page-title h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #0F172A;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
  }

  .page-title p {
    font-size: 1.125rem;
    color: #64748B;
    margin: 0 0 40px 0;
    font-weight: 400;
  }

  .patient-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 16px;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 400;
    background-color: #F8FAFC;
    transition: all 0.3s ease;
    outline: none;
    font-family: inherit;
  }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: #1E3A8A;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    background-color: #FFFFFF;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .save-btn {
    grid-column: 1 / -1;
    justify-self: start;
    width: 200px;
    padding: 16px 32px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%);
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
    margin-top: 16px;
  }

  .save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
  }

  @media (max-width: 768px) {
    .add-patient-container {
      padding: 24px;
      margin: 0 16px;
    }

    .add-patient-header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .main-nav {
      gap: 24px;
    }

    .page-title h1 {
      font-size: 2.25rem;
    }

    .patient-form {
      grid-template-columns: 1fr;
    }

    .save-btn {
      width: 100%;
      justify-self: stretch;
    }
  }

  @media (max-width: 480px) {
    .page-title h1 {
      font-size: 1.875rem;
    }

    .add-patient-container {
      padding: 20px;
      margin: 0;
      border-radius: 0;
    }
  }
`;

const AddPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caseId: '',
    patientId: '',
    fullName: '',
    age: '',
    gender: '',
    medicalHistory: '',
    contactInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ get doctorId from localStorage (set during login)
      const doctorId = localStorage.getItem("doctorId");
      if (!doctorId) {
        alert("No doctor logged in!");
        return;
      }

      const response = await fetch("http://localhost:5000/api/patients/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, doctorId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Patient Saved!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to save patient");
      }
    } catch (error) {
      console.error("Error saving patient:", error);
      alert("Server error while saving patient");
    }
  };

  return (
    <>
      <style>{AddPatientStyles}</style>
      <div id="add-patient-page">
        <div className="add-patient-container">
          <header className="add-patient-header">
            <div className="logo-area">
              <OncoCodeLogo />
              <div>
                <div className="company-name">OncoCode</div>
                <div className="tagline">Precision Oncology, Simplified</div>
              </div>
            </div>
            <nav className="main-nav">
              <a href="/dashboard">Dashboard</a>
              <a href="/search_patient">Patients</a>
              <a href="/login">Logout</a>
            </nav>
          </header>

          <main>
            <div className="page-title">
              <h1>Add New Patient</h1>
              <p>Enter patient details to register a new profile</p>
            </div>

            <form className="patient-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="caseId">Case ID</label>
                <input type="text" id="caseId" name="caseId" value={formData.caseId} onChange={handleChange} placeholder="Enter case ID" />
              </div>
              <div className="form-group">
                <label htmlFor="patientId">Patient ID</label>
                <input type="text" id="patientId" name="patientId" value={formData.patientId} onChange={handleChange} placeholder="Enter patient ID" />
              </div>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} placeholder="Enter age" />
              </div>
              <div className="form-group full-width">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="medicalHistory">Medical History</label>
                <textarea id="medicalHistory" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Enter medical history"></textarea>
              </div>
              <div className="form-group full-width">
                <label htmlFor="contactInfo">Contact Info</label>
                <textarea id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Enter contact information"></textarea>
              </div>
              <button type="submit" className="save-btn">
                <FaSave /> Save Patient
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
