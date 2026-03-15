// src/components/BudgetSettings.js
import React, { useState } from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const BudgetSettings = () => {
  const { budgetLimits, updateBudgetLimits } = useFinancialContext();

  const [incomeLimit, setIncomeLimit] = useState(budgetLimits.incomeLimit || 0);
  const [expensesLimit, setExpensesLimit] = useState(budgetLimits.expensesLimit || 0);
  const [savingsGoal, setSavingsGoal] = useState(budgetLimits.savingsGoal || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudgetLimits({ incomeLimit, expensesLimit, savingsGoal });
    alert('Budget limits updated!');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-6 rounded-xl shadow-lg mb-6">

      <h2 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">
        💼 Budget Settings
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Income Limit */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-200">
            Income Limit
          </label>
          <input
            type="number"
            value={incomeLimit}
            onChange={(e) => setIncomeLimit(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Expenses Limit */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-200">
            Expenses Limit
          </label>
          <input
            type="number"
            value={expensesLimit}
            onChange={(e) => setExpensesLimit(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Savings Goal */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-200">
            Savings Goal
          </label>
          <input
            type="number"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition"
          >
            Save Budget
          </button>
        </div>

      </form>
    </div>
  );
};

export default BudgetSettings;
