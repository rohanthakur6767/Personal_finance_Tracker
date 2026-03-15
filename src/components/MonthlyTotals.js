// src/components/MonthlyTotals.js

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

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-2xl font-extrabold mb-6 text-cyan-300 border-b border-cyan-600 pb-3 tracking-wide text-center">
        📆 Totals for {monthNames[currentMonth]}
      </h2>

      <ul className="space-y-4 text-lg">
        <li className="flex justify-between border-b border-slate-700 pb-2">
          <span className="text-green-400 font-semibold">Income</span>
          <span className="font-bold text-green-300">${data.income}</span>
        </li>

        <li className="flex justify-between border-b border-slate-700 pb-2">
          <span className="text-red-400 font-semibold">Expenses</span>
          <span className="font-bold text-red-300">${data.expenses}</span>
        </li>

        <li className="flex justify-between">
          <span className="text-blue-400 font-semibold">Savings</span>
          <span className="font-bold text-blue-300">${data.savings}</span>
        </li>
      </ul>
    </div>
  );
};

export default MonthlyTotals;
