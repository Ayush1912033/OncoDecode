import tensorflow as tf
import joblib
import pandas as pd
import numpy as np

# Load model and preprocessing objects
model = tf.keras.models.load_model("fnn_cancer_type_model.keras")
label_encoder = joblib.load("label_encoder.pkl")
scaler = joblib.load("scaler.pkl")
pca = joblib.load("pca.pkl")

# Metadata/target columns to drop
DROP_COLS = ["patient_id", "bcr_patient_uuid", "disease_code", "acronym"]

def preprocess(df):
    # Drop known metadata/targets
    df = df.drop(columns=[c for c in DROP_COLS if c in df.columns], errors="ignore")

    # Convert to numeric & fill NaNs
    df_numeric = df.apply(pd.to_numeric, errors="coerce").fillna(0.0)

    # 🔹 Force column alignment to PCA training features
    expected = pca.n_features_in_
    current = df_numeric.shape[1]

    if current > expected:
        print(f"⚠️ Extra columns detected: {current - expected}. Dropping extras.")
        df_numeric = df_numeric.iloc[:, :expected]
    elif current < expected:
        print(f"⚠️ Missing columns: padding {expected - current} zeros.")
        missing = expected - current
        df_numeric = pd.concat([df_numeric, pd.DataFrame(np.zeros((len(df_numeric), missing)))], axis=1)

    # PCA → Scaler
    X_pca = pca.transform(df_numeric.values)
    X_scaled = scaler.transform(X_pca)
    return X_scaled

# Load your test file
test_df = pd.read_csv("test_sample.csv")

# Preprocess + predict
X_new = preprocess(test_df)
y_pred = model.predict(X_new)
pred_classes = label_encoder.inverse_transform(np.argmax(y_pred, axis=1))

print("✅ Predicted cancer types:")
for i, cancer in enumerate(pred_classes, start=1):
    print(f"Sample {i}: {cancer}")
