import os
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

# ---------------------------
# MongoDB Connection
# ---------------------------
MONGO_URI = "mongodb+srv://appuser:Ayush1912033@oncolens.t5xqicp.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["test"]  # ✅ use consistent DB name
analysis_collection = db["analysis"]

# ---------------------------
# Load models & preprocessors
# ---------------------------
print("🔄 Loading models...")

TYPE_MODEL = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/cancer type/fnn_cancer_type_model.keras"
TYPE_PCA = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/cancer type/pca.pkl"
TYPE_SCALER = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/cancer type/scaler.pkl"
TYPE_LABEL_ENCODER = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/cancer type/label_encoder.pkl"

STAGE_MODEL = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/stage prediction/stage_dnn_model.keras"
STAGE_PCA = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/stage prediction/pca.pkl"
STAGE_SCALER = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/stage prediction/scaler.pkl"
STAGE_LABEL_ENCODER = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/stage prediction/label_encoder_stage.pkl"

SURVIVAL_MODEL = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/survival prediction/deepsurv_model.keras"
SURVIVAL_PCA = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/survival prediction/pca.pkl"
SURVIVAL_SCALER = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/survival prediction/scaler.pkl"
SURVIVAL_ENCODERS = r"C:/Users/ayush/OneDrive/Desktop/predict/ml/survival prediction/label_encoders.pkl"

# Load models
model_type = tf.keras.models.load_model(TYPE_MODEL, compile=False)
model_stage = tf.keras.models.load_model(STAGE_MODEL, compile=False)
model_survival = tf.keras.models.load_model(SURVIVAL_MODEL, compile=False)

pca_type = joblib.load(TYPE_PCA)
scaler_type = joblib.load(TYPE_SCALER)
le_type = joblib.load(TYPE_LABEL_ENCODER)

pca_stage = joblib.load(STAGE_PCA)
scaler_stage = joblib.load(STAGE_SCALER)
le_stage = joblib.load(STAGE_LABEL_ENCODER)

pca_surv = joblib.load(SURVIVAL_PCA)
scaler_surv = joblib.load(SURVIVAL_SCALER)
encoders_surv = joblib.load(SURVIVAL_ENCODERS)

print("✅ Models loaded")

# ---------------------------
# Preprocessing Helpers
# ---------------------------
def align_features(df, expected):
    current = df.shape[1]
    if current > expected:
        df = df.iloc[:, :expected]
    elif current < expected:
        df = pd.concat([df, pd.DataFrame(np.zeros((len(df), expected - current)))], axis=1)
    return df

def preprocess_type(df):
    DROP_COLS = ["patient_id", "bcr_patient_uuid", "disease_code", "acronym"]
    df = df.drop(columns=[c for c in DROP_COLS if c in df.columns], errors="ignore")
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0.0)
    df = align_features(df, pca_type.n_features_in_)
    return scaler_type.transform(pca_type.transform(df.values))

def preprocess_stage(df):
    META_COLS = ["patient_id", "bcr_patient_uuid", "disease_code", "sample_id", "case_id", "submitter_id"]
    df = df.drop(columns=[c for c in META_COLS if c in df.columns], errors="ignore")
    if "pathologic_stage" in df.columns:
        df = df.drop(columns=["pathologic_stage"])
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0.0)
    df = align_features(df, pca_stage.n_features_in_)
    return scaler_stage.transform(pca_stage.transform(df.values))

def preprocess_survival(df):
    df.replace(["[Not Available]", "[Unknown]", "[Not Evaluated]", "[Not Applicable]"], np.nan, inplace=True)
    for col, le in encoders_surv.items():
        if col in df.columns:
            try:
                df[col] = le.transform(df[col].astype(str))
            except Exception:
                df[col] = pd.to_numeric(df[col], errors="coerce")
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0.0)
    df = align_features(df, pca_surv.n_features_in_)
    return scaler_surv.transform(pca_surv.transform(df.values))

# ---------------------------
# Flask API
# ---------------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        if "patientId" not in request.form:
            return jsonify({"error": "Patient ID is required"}), 400

        file = request.files["file"]
        patientId = request.form["patientId"]
        df = pd.read_csv(file)

        # Predictions
        X_type = preprocess_type(df.copy())
        y_pred_type = model_type.predict(X_type)
        pred_type = le_type.inverse_transform(np.argmax(y_pred_type, axis=1))

        X_stage = preprocess_stage(df.copy())
        y_pred_stage = model_stage.predict(X_stage)
        pred_stage = le_stage.inverse_transform(np.argmax(y_pred_stage, axis=1))

        X_surv = preprocess_survival(df.copy())
        risk_scores = model_survival.predict(X_surv)[:, 0]

        results = []
        for i in range(len(df)):
            result = {
                "patientId": patientId,
                "CancerType": str(pred_type[i]),
                "Stage": str(pred_stage[i]),
                "SurvivalRiskScore": float(risk_scores[i]),
                "SurvivalInterpretation": "High Risk (Low survival)" if risk_scores[i] > 0 else "Low Risk (High survival)",
                "createdAt": datetime.utcnow()
            }
            results.append(result)

        # Save results in MongoDB
        if results:
            insert_result = analysis_collection.insert_many(results)
            for i, oid in enumerate(insert_result.inserted_ids):
                results[i]["_id"] = str(oid)

        return jsonify({
            "message": "✅ Predictions successful",
            "patientId": patientId,
            "results": results
        })

    except Exception as e:
        print("❌ Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 500

# ✅ New route to fetch saved analysis
@app.route("/api/analysis/<patientId>", methods=["GET"])
def get_analysis(patientId):
    try:
        results = list(analysis_collection.find({"patientId": patientId}).sort("_id", -1))
        for r in results:
            r["_id"] = str(r["_id"])
        if not results:
            return jsonify({"message": "No analysis found for this patient"}), 404
        return jsonify(results)
    except Exception as e:
        print("❌ Fetch Analysis Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
