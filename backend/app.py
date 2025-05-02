from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load("model/final_xgboost_top10_model.pkl")

# Define features and label mappings
FEATURES = [
    "Contract",
    "Monthly Charge",
    "Number of Referrals",
    "Dependents",
    "Avg Monthly GB Download",
    "Tenure in Months",
    "Payment Method",
    "Online Backup",
    "Online Security",
    "Premium Tech Support",
]

# Manually define label encodings used during model training
label_mappings = {
    "Contract": {
        "Month-to-month": 0,
        "One year": 1,
        "Two year": 2
    },
    "Dependents": {
        "No": 0,
        "Yes": 1
    },
    "Payment Method": {
        "Electronic Check": 0,
        "Mailed Check": 1,
        "Bank Transfer": 2,
        "Credit Card": 3
    },
    "Online Backup": {
        "No": 0,
        "Yes": 1,
    },
    "Online Security": {
        "No": 0,
        "Yes": 1,
    },
    "Premium Tech Support": {
        "No": 0,
        "Yes": 1,
    }
}

def make_prediction(data):
    # Convert input to DataFrame
    df = pd.DataFrame([data])[FEATURES]

    # Encode categorical columns
    for col in df.select_dtypes(include='object').columns:
        if col in label_mappings:
            if df[col].iloc[0] not in label_mappings[col]:
                raise ValueError(f"Unknown category '{df[col].iloc[0]}' for feature '{col}'")
            df[col] = df[col].map(label_mappings[col])

    # Ensure numeric columns are floats
    numeric_cols = [
        "Monthly Charge",
        "Number of Referrals",
        "Avg Monthly GB Download",
        "Tenure in Months"
    ]
    df[numeric_cols] = df[numeric_cols].astype(float)

    # Predict
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return prediction, probability

# Health check route
@app.route("/", methods=["GET"])
def index():
    return "✅ Churn Prediction API is running!"

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        prediction, probability = make_prediction(data)

        # Convert prediction to a native Python type (float)
        probability = float(probability)  # Ensuring it's a native float for JSON serialization

        return jsonify({
            "prediction": "Churn" if prediction == 1 else "No Churn",
            "probability": round(probability, 4)
        })
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

# Static model metrics
@app.route("/metrics", methods=["GET"])
def metrics():
    return jsonify({
        "accuracy": 0.8432,
        "precision": 0.6667,
        "recall": 0.78,
        "f1_score": 0.7189,
        "roc_auc": 0.8127
    })

if __name__ == "__main__":
    app.run(debug=True)



