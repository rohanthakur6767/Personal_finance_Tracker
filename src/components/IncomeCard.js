import React, { useState } from 'react';

const IncomeCard = ({ income, handleAdd }) => {
  const [amount, setAmount] = useState('');

  const submit = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      handleAdd('income', num);
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
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Income</h2>
            <p className="text-xs text-gray-400">Total earned</p>
          </div>
        </div>
        <span className="badge-income">Active</span>
      </div>

      <p className="text-3xl font-extrabold text-gray-900 tracking-tight mb-5">
        ${income.toLocaleString()}
      </p>

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
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white
                     hover:bg-emerald-700 active:scale-[0.98]
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2
                     transition-all duration-200 ease-out"
        >
          <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Income
        </button>
      </div>
    </div>
  );
};

export default IncomeCard;
