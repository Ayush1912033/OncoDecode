import tensorflow as tf
import pandas as pd
import joblib
import numpy as np

# Load model + preprocessing
model = tf.keras.models.load_model("stage_dnn_model.keras")
pca = joblib.load("pca.pkl")
scaler = joblib.load("scaler.pkl")
le_stage = joblib.load("label_encoder_stage.pkl")

# The same metadata columns you dropped in training:
META_COLS = ["patient_id", "bcr_patient_uuid", "disease_code", 
             "sample_id", "case_id", "submitter_id"]

def preprocess(df):
    # Drop metadata
    df = df.drop(columns=[c for c in META_COLS if c in df.columns], errors="ignore")

    # Drop target if present
    if "pathologic_stage" in df.columns:
        print("⚠️ Dropping target column from input")
        df = df.drop(columns=["pathologic_stage"])

    # Force numeric
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0.0)

    # Align features
    expected_features = pca.n_features_in_
    if df.shape[1] != expected_features:
        print(f"⚠️ Adjusting features: test={df.shape[1]}, expected={expected_features}")
        if df.shape[1] > expected_features:
            df = df.iloc[:, :expected_features]
        else:
            missing = expected_features - df.shape[1]
            df = pd.concat([df, pd.DataFrame(np.zeros((len(df), missing)))], axis=1)

    # Make sure after alignment we have the right shape
    if df.shape[1] != expected_features:
        raise ValueError(f"❌ Still mismatched: got {df.shape[1]}, expected {expected_features}")

    # PCA → Scaler
    X_pca = pca.transform(df.values)
    X_scaled = scaler.transform(X_pca)

    print("✅ Preprocessed shape:", X_scaled.shape)
    return X_scaled

# Load your test CSV
test_df = pd.read_csv("test_sample.csv")

X_new = preprocess(test_df)
pred_proba = model.predict(X_new)
pred_idx = np.argmax(pred_proba, axis=1)
pred_stage = le_stage.inverse_transform(pred_idx)

print("\n=== Predictions ===")
for i, stage in enumerate(pred_stage):
    print(f"Sample {i+1}: {stage}")
