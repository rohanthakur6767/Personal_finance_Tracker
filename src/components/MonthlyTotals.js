import React from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const getCurrentMonth = () => new Date().getMonth();

const MonthlyTotals = () => {
  const { monthlyData } = useFinancialContext();
  const currentMonth = getCurrentMonth();

  const data = monthlyData[currentMonth] || {
    income: 0,
    expenses: 0,
    savings: 0,
  };

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  const items = [
    {
      label: 'Income',
      value: data.income,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      icon: (
        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      ),
    },
    {
      label: 'Expenses',
      value: data.expenses,
      color: 'text-red-600',
      bg: 'bg-red-50',
      icon: (
        <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
        </svg>
      ),
    },
    {
      label: 'Savings',
      value: data.savings,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      icon: (
        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">{monthNames[currentMonth]} Summary</h2>
          <p className="text-sm text-gray-500 mt-0.5">Current month at a glance</p>
        </div>
        <span className="text-xs font-semibold text-gray-400 bg-surface-100 px-3 py-1 rounded-full">
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
            <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">{item.label}</p>
              <p className={`text-lg font-bold ${item.color}`}>
                ${item.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyTotals;
