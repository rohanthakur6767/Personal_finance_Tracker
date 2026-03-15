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
    resetData,
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
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Dashboard</h2>
        <button
          onClick={() => {
            if (window.confirm('Reset all data? This cannot be undone.')) {
              resetData();
            }
          }}
          className="btn-danger"
        >
          Reset All Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
          <p className="text-xs font-medium text-gray-500 mb-1">Income</p>
          <p className="text-2xl font-bold text-gray-900">${income.toLocaleString()}</p>
          <button
            onClick={() => {
              const amount = prompt('Enter income amount:');
              if (amount) handleAdd('income', parseFloat(amount));
            }}
            className="mt-3 w-full py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            + Add Income
          </button>
        </div>

        <div className="p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
          <p className="text-xs font-medium text-gray-500 mb-1">Expenses</p>
          <p className="text-2xl font-bold text-gray-900">${expenses.toLocaleString()}</p>
          <button
            onClick={() => {
              const amount = prompt('Enter expense amount:');
              if (amount) handleAdd('expenses', parseFloat(amount));
            }}
            className="mt-3 w-full py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition"
          >
            + Add Expense
          </button>
        </div>

        <div className="p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
          <p className="text-xs font-medium text-gray-500 mb-1">Savings</p>
          <p className="text-2xl font-bold text-gray-900">${savings.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">
            Goal: ${budgetLimits.savingsGoal.toLocaleString()} &middot;{' '}
            {budgetLimits.savingsGoal > 0
              ? ((savings / budgetLimits.savingsGoal) * 100).toFixed(1)
              : 0}%
          </p>
          <button
            onClick={() => {
              const amount = prompt('Enter savings amount:');
              if (amount) handleAdd('savings', parseFloat(amount));
            }}
            className="mt-3 w-full py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + Add Savings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
