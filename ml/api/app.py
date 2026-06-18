from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load("../models/model.pkl")
scaler = joblib.load("../models/scaler.pkl")
features = joblib.load("../models/features.pkl")

# convert ALL feature names to normal Python strings
features = [str(f) for f in features]

@app.route("/")
def home():
    return jsonify({
        "message": "PCOS API Running"
    })

@app.route("/test", methods=["POST"])
def test():
    return jsonify({
        "success": True
    })

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        input_row = []

        for feature in features:

            input_row.append(
                data.get(str(feature), 0)
            )

        df = pd.DataFrame([input_row])

        scaled = scaler.transform(df.values)

        prediction = model.predict(
            scaled
        )[0]

        probability = model.predict_proba(
            scaled
        )[0][1]

        if probability >= 0.80:
            risk = "High"

        elif probability >= 0.50:
            risk = "Moderate"

        else:
            risk = "Low"

        return jsonify({

            "prediction":
            int(prediction),

            "probability":
            round(probability * 100, 2),

            "riskLevel":
            risk

        })

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500



if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )