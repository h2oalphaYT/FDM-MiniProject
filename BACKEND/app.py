from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model pipeline
model_pipeline = joblib.load('model_pipeline.pkl')

@app.route('/')
def home():
    return "Welcome to the Lasso Regression Model API!"

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.get_json()

    # Convert JSON data to DataFrame
    new_data = pd.DataFrame(data)

    # Drop columns that are not needed for prediction
    new_data_preprocessed = new_data.drop(columns=['vin', 'state', 'saledate'], errors='ignore')

    # Make predictions
    predictions = model_pipeline.predict(new_data_preprocessed)

    # Convert predictions to a list and return as JSON
    predictions_list = predictions.tolist()
    return jsonify(predictions=predictions_list)

if __name__ == '__main__':
    app.run(debug=True)
