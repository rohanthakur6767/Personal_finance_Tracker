// src/components/SavingsCard.js
import React, { useState } from 'react';

const SavingsCard = ({ savings, handleAdd, budgetLimits }) => {
  const [amount, setAmount] = useState('');

  const progress =
    budgetLimits?.savingsGoal && budgetLimits.savingsGoal > 0
      ? (savings / budgetLimits.savingsGoal) * 100
      : 0;

  const submit = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      handleAdd('savings', num);
      setAmount('');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-extrabold mb-4 text-yellow-300 border-b border-yellow-600 pb-2 tracking-wide">
        🏦 Savings
      </h2>

      {/* Savings Amount */}
      <p className="text-3xl font-bold text-green-400">${savings}</p>

      {/* Goal */}
      <p className="mt-1 text-sm text-slate-300">
        Goal:{' '}
        <span className="font-semibold text-yellow-300">
          {budgetLimits?.savingsGoal ? `$${budgetLimits.savingsGoal}` : 'Not set'}
        </span>
      </p>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-sm font-semibold mb-1">
          <span className="text-slate-200">Progress</span>
          <span className="text-yellow-300">{progress.toFixed(1)}%</span>
        </div>

        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="mt-4 block w-full p-2 rounded bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Button */}
      <button
        onClick={submit}
        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
      >
        + Add Savings
      </button>
    </div>
  );
};

export default SavingsCard;
