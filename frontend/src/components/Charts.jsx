import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Charts = ({ probability, featureImportance }) => {
  const churnProbability =
    typeof probability === 'number' && !isNaN(probability)
      ? Math.min(Math.max(probability, 0), 1)
      : 0.5;

  const defaultFeatureImportance = {
    labels: [
      'Contract',
      'Dependents',
      'Premium Tech Support',
      'Online Security',
      'Number of Referrals',
      'Payment Method',
      'Online Backup',
      'Avg Monthly GB Download',
      'Monthly Charge',
      'Tenure in Months',
    ],
    values: [
      0.460929,
      0.143020,
      0.077804,
      0.077227,
      0.076872,
      0.057801,
      0.038648,
      0.024825,
      0.022480,
      0.020395,
    ],
  };

  const features = featureImportance?.labels || defaultFeatureImportance.labels;
  const importances = featureImportance?.values || defaultFeatureImportance.values;

  const pieData = {
    labels: ['Churn', 'No Churn'],
    datasets: [
      {
        label: 'Churn Probability',
        data: [churnProbability, 1 - churnProbability],
        backgroundColor: ['#f87171', '#4ade80'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: features,
    datasets: [
      {
        label: 'Feature Importance',
        data: importances,
        backgroundColor: '#60a5fa',
        borderRadius: 5,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Churn Over Time',
        data: [50, 80, 65, 100, 90, 110],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#6366f1',
      },
    ],
  };

  const contractData = {
    labels: ['Month-to-Month', 'One Year', 'Two Year'],
    datasets: [
      {
        label: 'Contract Types',
        data: [500, 300, 200],
        backgroundColor: ['#facc15', '#34d399', '#a78bfa'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-center text-xl font-semibold mb-3">Churn Probability</h2>
        <Pie data={pieData} options={options} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-center text-xl font-semibold mb-3">Feature Importance</h2>
        <Bar data={barData} options={options} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-center text-xl font-semibold mb-3">Churn Trend Over Time</h2>
        <Line data={lineData} options={options} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-center text-xl font-semibold mb-3">Contract Distribution</h2>
        <Pie data={contractData} options={options} />
      </div>
    </div>
  );
};

export default Charts;




