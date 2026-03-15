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
        backgroundColor: '#10B981',
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: monthlyData.map((m) => m.expenses),
        backgroundColor: '#EF4444',
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Savings',
        data: monthlyData.map((m) => m.savings),
        backgroundColor: '#6366F1',
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: '#6B7280',
          font: { size: 12, weight: '600', family: 'Inter' },
          usePointStyle: true,
          pointStyleWidth: 8,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleFont: { family: 'Inter', weight: '600' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: $${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF', font: { size: 12, family: 'Inter' } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font: { size: 12, family: 'Inter' },
          callback: (value) => `$${value}`,
        },
        grid: { color: '#F3F4F6', drawBorder: false },
        border: { display: false },
      },
    },
  };

  return (
    <div className="dashboard-card p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Monthly Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Financial comparison across months</p>
      </div>

      <div className="w-full h-[280px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyBarChart;
