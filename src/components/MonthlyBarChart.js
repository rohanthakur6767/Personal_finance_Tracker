// src/components/MonthlyBarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useFinancialContext } from '../context/FinancialContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyBarChart = () => {
  const { monthlyData } = useFinancialContext();

  const labels = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map((m) => m.income),
        backgroundColor: '#3B82F6',
        borderColor: '#93C5FD',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: monthlyData.map((m) => m.expenses),
        backgroundColor: '#EF4444',
        borderColor: '#FCA5A5',
        borderWidth: 1,
      },
      {
        label: 'Savings',
        data: monthlyData.map((m) => m.savings),
        backgroundColor: '#10B981',
        borderColor: '#6EE7B7',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB',
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#E5E7EB' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#E5E7EB' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-extrabold mb-6 text-purple-300 border-b border-purple-600 pb-3 text-center tracking-wide">
        📅 Monthly Financial Overview
      </h2>

      <div className="w-full max-w-5xl h-[420px] mx-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyBarChart;
