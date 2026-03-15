// src/components/ExpenseCard.js
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

    return (
        <div className="bg-slate-900 text-slate-100 p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-300 border-b border-red-600 pb-2">
                💸 Expenses
            </h2>

            <p className="text-3xl font-bold text-red-500">${expenses}</p>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter expense amount"
                className="mt-4 w-full p-2 rounded-md 
                           bg-slate-800 text-white 
                           border border-slate-600
                           focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
                onClick={submit}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 
                           text-white py-2 rounded-md font-medium transition"
            >
                + Add Expense
            </button>
        </div>
    );
};

export default ExpenseCard;
