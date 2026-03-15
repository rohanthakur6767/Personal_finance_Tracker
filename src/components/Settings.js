// src/components/Settings.js

import React from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const Settings = () => {
  const { resetData } = useFinancialContext();

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all data? This action cannot be undone.'
      )
    ) {
      resetData();
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold border-b border-slate-600 pb-2 mb-4">
        ⚙️ Settings
      </h2>

      <p className="text-sm text-slate-400 mb-4">
        Resetting will permanently delete all financial data stored in this app.
      </p>

      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        🔄 Reset All Data
      </button>
    </div>
  );
};

export default Settings;
