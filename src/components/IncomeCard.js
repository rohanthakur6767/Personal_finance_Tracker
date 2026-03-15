// src/components/IncomeCard.js
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

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-green-300 border-b border-green-600 pb-2">
        📈 Income
      </h2>

      <p className="text-3xl font-extrabold text-green-400 mb-4">
        ${income}
      </p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="
          w-full p-2 rounded
          bg-white text-gray-900
          border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-green-500
        "
      />

      <button
        onClick={submit}
        className="
          mt-3 w-full
          bg-green-600 hover:bg-green-700
          text-white font-medium
          py-2 rounded
          transition
        "
      >
        + Add Income
      </button>
    </div>
  );
};

export default IncomeCard;
