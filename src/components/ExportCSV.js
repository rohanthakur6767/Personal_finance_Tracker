// src/components/ExportCSV.js
import React from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const ExportCSV = () => {
  const { transactions } = useFinancialContext();

  const downloadCSV = () => {
    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }

    const headers = ['Date', 'Type', 'Amount'];
    const rows = transactions.map(tx => [tx.date, tx.type, tx.amount]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-6 flex justify-end">
      <button
        onClick={downloadCSV}
        className="bg-gray-700 hover:bg-gray-600 
                   text-white px-5 py-2 rounded-lg 
                   font-medium transition shadow-md"
      >
        ⬇️ Export Transactions (CSV)
      </button>
    </div>
  );
};

export default ExportCSV;
