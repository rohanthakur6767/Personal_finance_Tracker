import React, { useState } from 'react';

const ExpenseCard = ({ expenses, handleAdd }) => {
  const [amount, setAmount] = useState('');

  const submit = () => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      handleAdd('expenses', num);
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
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Expenses</h2>
            <p className="text-xs text-gray-400">Total spent</p>
          </div>
        </div>
        <span className="badge-expenses">Tracking</span>
      </div>

      <p className="text-3xl font-extrabold text-gray-900 tracking-tight mb-5">
        ${expenses.toLocaleString()}
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
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white
                     hover:bg-red-700 active:scale-[0.98]
                     focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2
                     transition-all duration-200 ease-out"
        >
          <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
