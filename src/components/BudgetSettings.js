import React, { useState } from 'react';
import { useFinancialContext } from '../context/FinancialContext';

const BudgetSettings = () => {
  const { budgetLimits, updateBudgetLimits } = useFinancialContext();
  const [isOpen, setIsOpen] = useState(false);

  const [incomeLimit, setIncomeLimit] = useState(budgetLimits.incomeLimit || 0);
  const [expensesLimit, setExpensesLimit] = useState(budgetLimits.expensesLimit || 0);
  const [savingsGoal, setSavingsGoal] = useState(budgetLimits.savingsGoal || 0);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudgetLimits({ incomeLimit, expensesLimit, savingsGoal });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="dashboard-card overflow-hidden">
      {/* Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold text-gray-900">Budget Settings</h2>
            <p className="text-xs text-gray-500">Configure your income, expense, and savings limits</p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Collapsible Form */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="px-6 pb-5 pt-2 border-t border-gray-100 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Income Limit
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={incomeLimit}
                  onChange={(e) => setIncomeLimit(Number(e.target.value))}
                  className="input-field pl-7"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Expenses Limit
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={expensesLimit}
                  onChange={(e) => setExpensesLimit(Number(e.target.value))}
                  className="input-field pl-7"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Savings Goal
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(Number(e.target.value))}
                  className="input-field pl-7"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="btn-primary">
              {saved ? (
                <>
                  <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Saved
                </>
              ) : 'Save Budget'}
            </button>
            {saved && <span className="text-xs text-emerald-600 font-medium">Budget limits updated successfully</span>}
          </div>
        </form>
      )}
    </div>
  );
};

export default BudgetSettings;
