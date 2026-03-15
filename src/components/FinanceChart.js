import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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
          ? ['#10B981', '#EF4444', '#6366F1']
          : ['#f1f5f9', '#f1f5f9', '#f1f5f9'],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    animation: {
      animateRotate: true,
      duration: 1200,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#6B7280',
          font: { size: 13, weight: '600', family: 'Inter' },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleFont: { family: 'Inter', weight: '600' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => ` $${ctx.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="dashboard-card p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Finance Breakdown</h2>
        <p className="text-sm text-gray-500 mt-0.5">Distribution of your finances</p>
      </div>

      {hasData ? (
        <div className="w-full h-[280px] flex items-center justify-center">
          <Doughnut data={data} options={options} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[280px] text-center">
          <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
          <p className="text-sm text-gray-400 font-medium">No data available yet</p>
          <p className="text-xs text-gray-400 mt-0.5">Add transactions to see your breakdown</p>
        </div>
      )}
    </div>
  );
};

export default FinanceChart;
