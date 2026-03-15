// src/components/FinanceChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useFinancialContext } from '../context/FinancialContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const FinanceChart = () => {
  const { income, expenses, savings } = useFinancialContext();

  const hasData = income > 0 || expenses > 0 || savings > 0;

  const data = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        label: 'Amount',
        data: hasData ? [income, expenses, savings] : [1, 1, 1],
        backgroundColor: hasData
          ? ['#3B82F6', '#EF4444', '#10B981']
          : ['#374151', '#374151', '#374151'],
        borderColor: ['#1F2937'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      duration: 1200,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#E5E7EB',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.raw}`,
        },
      },
    },
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-300 border-b border-blue-600 pb-3 text-center tracking-wide">
        📊 Finance Summary
      </h2>

      {hasData ? (
        <div className="w-full max-w-md h-[300px] mx-auto">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No financial data available yet.
        </p>
      )}
    </div>
  );
};

export default FinanceChart;
