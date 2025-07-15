# 📉 Customer Churn Prediction – End-to-End ML & Web Deployment

A full-stack machine learning pipeline to detect potential customer churn in the telecom sector. This project integrates data preprocessing, model training (XGBoost & others), feature interpretation (SHAP), and deployment using **Flask** and **ReactJS** for real-time inference.

---

## 📌 Project Highlights

- ✅ Built and deployed an optimized XGBoost model with an AUC of **89.95%**
- 📊 Real-time churn insights through a responsive ReactJS dashboard (Chart.js)
- 🧪 Feature selection with **Permutation Importance** and **SHAP**
- ⚖️ Addressed class imbalance using **SMOTE**
- 🚀 Hosted full-stack app via **Render.com**

---

## 🧠 Problem Statement

Customer churn—the act of users discontinuing a service—hurts business revenue. Using historical telecom data, this model identifies customers who are likely to churn so that businesses can proactively intervene.

---

## 🏗️ Project Architecture

Data (CSV) → Preprocessing (SMOTE, Encoding) → XGBoost Model → Flask API → ReactJS Dashboard


---

## 🛠️ Technologies Used

| Task                          | Tool/Library                        |
|------------------------------|-------------------------------------|
| Data Processing              | Pandas, NumPy, scikit-learn         |
| Modeling                     | XGBoost, CatBoost, Random Forest    |
| Model Tuning                 | GridSearchCV, Threshold Optimization|
| Imbalanced Data Handling     | SMOTE (`imbalanced-learn`)          |
| Explainability               | SHAP, Permutation Importance        |
| Backend                      | Flask (REST API)                    |
| Frontend                     | ReactJS + Chart.js                  |
| Deployment                   | Render.com                          |

---

## 📁 Project Structure

Churn_Prediction_Model/
│
├── data/ # Raw and processed data
├── models/ # Trained model & encoders
├── api/ # Flask backend
│ └── app.py # REST API for prediction
├── dashboard/ # ReactJS frontend
│ └── components/ # Chart.js visualizations
├── churn_prediction.ipynb # Model training + evaluation notebook
├── requirements.txt # Python dependencies
└── README.md # You are here!


---

## 📊 Model Performance

| Metric       | Score     |
|--------------|-----------|
| Accuracy     | 83.89%    |
| Precision    | 67.63%    |
| Recall       | 75.40%    |
| F1-Score     | 71.30%    |
| AUC (ROC)    | **89.95%**|

- Optimized Decision Threshold: `0.54`  
- Top Features: `tenure`, `monthly charges`, `contract type`, `online security`, `streaming TV`

---

## 🔍 Key Features

- **Real-Time Inference:** Predict churn directly through a web interface.
- **Balanced Learning:** SMOTE applied only on the training set to avoid leakage.
- **SHAP Visualizations:** Understand feature influence both globally and locally.
- **API + Frontend Integration:** Clean RESTful design for smooth interaction.
- **Ensemble Experiments:** Tested LightGBM, CatBoost, and voting ensembles.

---

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/knull23/Churn_Prediction_Model.git
cd Churn_Prediction_Model
```
Install Python Dependencies
```
pip install -r requirements.txt
```
Launch the Backend (Flask)
```
cd api
python app.py
```
Launch the Frontend (React)
```
cd dashboard
npm install
npm start

```

🧪 Deployment Snapshot 
Model File: final_model.pkl

Encoded Inputs: LabelEncoder + OneHotEncoder

Visualization: 4 key charts using Chart.js

Hosting: Render.com


🔮 Future Enhancements
📡 Kafka for Streaming: Real-time data scoring pipeline

⚡ FastAPI Upgrade: Async endpoints for high performance

🧠 Optuna: Smarter hyperparameter tuning

🔐 OAuth2 + RBAC: Secure multi-user dashboard

🧪 A/B Testing: Retention strategy validation

📱 Mobile Dashboard: Responsive analytics interface

🔔 Churn Alerts: Email/SMS trigger system for high-risk users

🔗 Graph Modeling (GNN): Capture customer relationships


📚 References
View the [report.pdf](https://drive.google.com/file/d/1wifF1vZRGyL175-GAXNfwFdhapQ8EyRv/view?usp=drive_link) in this repo for complete citations, SHAP plots, architecture diagrams, and performance deep-dive.
