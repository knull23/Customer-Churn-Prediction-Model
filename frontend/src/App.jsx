import React, { useState } from "react";
import PredictionForm from "./components/PredictionForm";
import Charts from "./components/Charts";

function App() {
  const [predictionData, setPredictionData] = useState(null);

  const handlePrediction = (data) => {
    setPredictionData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
        Customer Churn Prediction Dashboard
      </h1>

      <PredictionForm onPredict={handlePrediction} />

      <div className="mt-14">
        <Charts
          probability={predictionData?.probability}
          featureImportance={predictionData?.featureImportance}
        />
      </div>
    </div>
  );
}

export default App;



