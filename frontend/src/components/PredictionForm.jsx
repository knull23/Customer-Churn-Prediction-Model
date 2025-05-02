import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    'Monthly Charge': '',
    'Contract': '',
    'Number of Referrals': '',
    'Dependents': '',
    'Avg Monthly GB Download': '',
    'Tenure in Months': '',
    'Payment Method': '',
    'Online Backup': '',
    'Online Security': '',
    'Premium Tech Support': ''
  });

  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');
  const [probability, setProbability] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null);

  const numericFields = [
    'Monthly Charge',
    'Number of Referrals',
    'Avg Monthly GB Download',
    'Tenure in Months',
  ];

  const categoricalOptions = {
    'Contract': ['Month-to-month', 'One year', 'Two year'],
    'Dependents': ['Yes', 'No'],
    'Payment Method': [
      'Electronic Check',
      'Mailed Check',
      'Bank Transfer',
      'Credit Card'
    ],
    'Online Backup': ['Yes', 'No'],
    'Online Security': ['Yes', 'No'],
    'Premium Tech Support': ['Yes', 'No']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value === '' ? '' : parseFloat(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');
    setProbability(null);
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(res.data.prediction);
      setProbability(res.data.probability);
      setFeatureImportance(res.data.featureImportance);
      onPredict({
        prediction: res.data.prediction,
        probability: res.data.probability,
        featureImportance: res.data.featureImportance
      });
    } catch (err) {
      console.error('Prediction error:', err);
      const msg =
        err.response?.data?.error ||
        'Prediction request failed. Please check backend or try again later.';
      setError(msg);
    }
  };

  return (
    <div className="p-4">
      {/* Metrics Display */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Model Performance</h2>
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <h3 className="text-sm font-semibold text-black-500 mb-1">Accuracy</h3>
            <p className="text-xl font-bold text-green-800">83.89%</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-black-500 mb-1">Precision</h3>
            <p className="text-xl font-bold text-blue-800">68.70%</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-black-500 mb-1">Recall</h3>
            <p className="text-xl font-bold text-yellow-800">72.19%</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-black-500 mb-1">F1 Score</h3>
            <p className="text-xl font-bold text-purple-800">70.40%</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-black-500 mb-1">AUC Curve</h3>
            <p className="text-xl font-bold text-red-800">89.95%</p>
          </div>
        </div>
      </div>

      {/* Prediction Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-lg"
      >
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-semibold mb-1">{key}</label>
            {categoricalOptions[key] ? (
              <select
                name={key}
                value={value}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select {key}</option>
                {categoricalOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                step="any"
                required
                className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-all mt-4"
          >
            Predict Churn
          </button>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </div>
      </form>

      {(prediction || probability !== null) && (
        <div
          className={`mt-8 p-6 rounded-2xl shadow-lg text-center transition-all duration-500 ${
            prediction === 'Churn' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          <h2 className="text-2xl font-bold mb-2">
            {prediction === 'Churn' ? '⚠️ Churn Risk Detected!' : '✅ Customer Likely to Stay!'}
          </h2>
          {probability !== null && (
            <p className="text-lg">
              Churn Probability:{' '}
              <span className="font-semibold">
                {(Math.min(Math.max(probability, 0), 1) * 100).toFixed(2)}%
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;







