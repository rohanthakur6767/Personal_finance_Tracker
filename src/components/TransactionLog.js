import React, { useState } from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const typeBadgeClass = {
  income: 'badge-income',
  expenses: 'badge-expenses',
  savings: 'badge-savings',
};

const TransactionLog = () => {
  const { transactions, deleteTransaction, updateTransaction } = useFinancialContext();
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [editedType, setEditedType] = useState('');

  const filteredTransactions = transactions.filter((tx) => {
    const matchType = searchType ? tx.type === searchType : true;
    const txDate = new Date(tx.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchDate = (!start || txDate >= start) && (!end || txDate <= end);
    return matchType && matchDate;
  });

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

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
      setEditingTransaction(null);
    }
  };

  return (
    <div className="dashboard-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Transaction Log</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input-field sm:w-40"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
            <option value="savings">Savings</option>
          </select>

          <div className="flex gap-2 flex-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field flex-1"
              placeholder="Start date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field flex-1"
              placeholder="End date"
            />
          </div>

          {(searchType || startDate || endDate) && (
            <button
              onClick={() => { setSearchType(''); setStartDate(''); setEndDate(''); }}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-surface-50 border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Type</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-50 transition-colors group">
                  <td className="px-6 py-3.5 text-sm text-gray-600 font-medium">{tx.date}</td>
                  <td className="px-6 py-3.5">
                    <span className={typeBadgeClass[tx.type] || 'badge bg-gray-50 text-gray-700'}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-right font-semibold text-gray-900">
                    ${Number(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(tx)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <p className="text-sm text-gray-400 font-medium">No transactions found</p>
                    <p className="text-xs text-gray-400">Add some transactions to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setEditingTransaction(null)} />
          <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-md animate-scale-in">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Edit Transaction</h3>
              <p className="text-sm text-gray-500 mt-0.5">Update the transaction details below</p>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                    className="input-field pl-7"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                <select
                  value={editedType}
                  onChange={(e) => setEditedType(e.target.value)}
                  className="input-field"
                >
                  <option value="income">Income</option>
                  <option value="expenses">Expenses</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-surface-50 rounded-b-2xl flex justify-end gap-3">
              <button onClick={() => setEditingTransaction(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionLog;
