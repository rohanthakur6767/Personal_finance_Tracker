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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="dashboard-card p-6 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Savings</h2>
            <p className="text-xs text-gray-400">
              Goal: {budgetLimits?.savingsGoal ? `$${budgetLimits.savingsGoal.toLocaleString()}` : 'Not set'}
            </p>
          </div>
        </div>
        <span className="badge-savings">{progress.toFixed(0)}%</span>
      </div>

      <p className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
        ${savings.toLocaleString()}
      </p>

      <div className="mb-5">
        <div className="flex justify-between text-xs font-medium mb-1.5">
          <span className="text-gray-500">Progress</span>
          <span className="text-blue-600">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: progress >= 100
                ? 'linear-gradient(90deg, #10b981, #059669)'
                : 'linear-gradient(90deg, #3b82f6, #6366f1)',
            }}
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0.00"
            className="input-field pl-7"
          />
        </div>
        <button
          onClick={submit}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white
                     hover:bg-blue-700 active:scale-[0.98]
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2
                     transition-all duration-200 ease-out"
        >
          <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Savings
        </button>
      </div>
    </div>
  );
};

export default SavingsCard;
