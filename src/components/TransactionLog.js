import React, { useState } from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const TransactionLog = () => {
  const { transactions, deleteTransaction, updateTransaction } = useFinancialContext();
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [editedType, setEditedType] = useState('');

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchType = searchType ? tx.type === searchType : true;
    const txDate = new Date(tx.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchDate = (!start || txDate >= start) && (!end || txDate <= end);
    return matchType && matchDate;
  });

  // Delete a transaction
  const handleDelete = (id) => {
    deleteTransaction(id);  // Assuming deleteTransaction is passed from context
  };

  // Edit a transaction
  const handleEdit = (tx) => {
    setEditingTransaction(tx);
    setEditedAmount(tx.amount);
    setEditedType(tx.type);
  };

  const handleSaveEdit = () => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, {
        amount: editedAmount,
        type: editedType,
      });
      setEditingTransaction(null); // Reset after save
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-xl mt-10">

      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-orange-500 text-orange-200 tracking-wide">
        📒 Transaction Log
      </h2>

      
      {/* Filter Options */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 rounded bg-gray-100 border border-gray-400 text-black w-full md:w-1/4"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
          <option value="savings">Savings</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded bg-gray-100 border border-gray-400 text-black w-full md:w-1/4"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded bg-gray-100 border border-gray-400 text-black w-full md:w-1/4"
        />
      </div>

      {/* Scrollable Transaction Table */}
      <div className="max-h-64 overflow-y-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <table className="min-w-full table-auto border-collapse text-gray-100">

          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border border-gray-400 px-4 py-2">Date</th>
              <th className="border border-gray-400 px-4 py-2">Type</th>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="text-center hover:bg-gray-700 hover:text-gray-200">
                  <td className="border border-gray-600 px-4 py-2 text-gray-100">{tx.date}</td>
                  <td className="border border-gray-600 px-4 py-2 text-gray-100 capitalize">{tx.type}</td>
                  <td className="border border-gray-600 px-4 py-2 text-gray-100">${tx.amount}</td>
                  <td className="border border-gray-600 px-4 py-2 text-gray-100">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-blue-400 hover:text-blue-600 mr-2 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Transaction Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Transaction</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Amount</label>
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="p-2 rounded border border-gray-400 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Type</label>
              <select
                value={editedType}
                onChange={(e) => setEditedType(e.target.value)}
                className="p-2 rounded border border-gray-400 w-full"
              >
                <option value="income">Income</option>
                <option value="expenses">Expenses</option>
                <option value="savings">Savings</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingTransaction(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionLog;
