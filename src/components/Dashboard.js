import React from 'react';
import { useFinancialContext } from './context/FinancialContext';

const Dashboard = () => {
  const {
    income,
    setIncome,
    expenses,
    setExpenses,
    savings,
    setSavings,
    budgetLimits,
    updateMonthlyData,
    addTransaction,
    resetData, // ✅ FIXED
  } = useFinancialContext();

  const handleAdd = (type, amount) => {
    if (type === 'income' && income + amount > budgetLimits.incomeLimit) {
      alert('Income exceeds the limit!');
      return;
    }
    if (type === 'expenses' && expenses + amount > budgetLimits.expensesLimit) {
      alert('Expenses exceed the limit!');
      return;
    }
    if (type === 'savings' && savings + amount > budgetLimits.savingsGoal) {
      alert('Savings goal reached!');
      return;
    }

    if (type === 'income') setIncome(prev => prev + amount);
    if (type === 'expenses') setExpenses(prev => prev + amount);
    if (type === 'savings') setSavings(prev => prev + amount);

    updateMonthlyData(new Date().getMonth(), type, amount);
    addTransaction(type, amount);
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Dashboard</h2>

        {/* ✅ Reset Button (proper place) */}
        <button
          onClick={() => {
            if (window.confirm('Reset all data? This cannot be undone.')) {
              resetData();
            }
          }}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md font-medium transition"
        >
          Reset All Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Income Card */}
        <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Income</h3>
          <p className="text-2xl">${income}</p>
          <button
            onClick={() => {
              const amount = prompt('Enter income amount:');
              if (amount) handleAdd('income', parseFloat(amount));
            }}
            className="mt-4 bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
          >
            + Add Income
          </button>
        </div>

        {/* Expenses Card */}
        <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Expenses</h3>
          <p className="text-2xl">${expenses}</p>
          <button
            onClick={() => {
              const amount = prompt('Enter expense amount:');
              if (amount) handleAdd('expenses', parseFloat(amount));
            }}
            className="mt-4 bg-red-500 hover:bg-red-400 px-4 py-2 rounded-md"
          >
            + Add Expense
          </button>
        </div>

        {/* Savings Card */}
        <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Savings</h3>
          <p className="text-2xl">${savings}</p>
          <p className="text-sm text-gray-300">
            Goal: ${budgetLimits.savingsGoal}
          </p>
          <p className="text-sm text-gray-300">
            {budgetLimits.savingsGoal > 0
              ? ((savings / budgetLimits.savingsGoal) * 100).toFixed(1)
              : 0}% of goal
          </p>
          <button
            onClick={() => {
              const amount = prompt('Enter savings amount:');
              if (amount) handleAdd('savings', parseFloat(amount));
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md"
          >
            + Add Savings
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
