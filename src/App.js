import React, { useState } from 'react';
import { useFinancialContext } from './context/FinancialContext';
import FinanceChart from './components/FinanceChart';
import MonthlyBarChart from './components/MonthlyBarChart';
import IncomeCard from './components/IncomeCard';
import ExpenseCard from './components/ExpenseCard';
import SavingsCard from './components/SavingsCard';
import TransactionLog from './components/TransactionLog';
import MonthlyTotals from './components/MonthlyTotals';
import BudgetSettings from './components/BudgetSettings';
import ExportCSV from './components/ExportCSV';

const getCurrentMonth = () => new Date().getMonth();

function App() {
  const {
    income,
    setIncome,
    expenses,
    setExpenses,
    savings,
    setSavings,
    updateMonthlyData,
    addTransaction,
    budgetLimits,
    resetData,
  } = useFinancialContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentMonth = getCurrentMonth();

  const handleAdd = (type, amount) => {
    if (type === 'income' && income + amount > budgetLimits.incomeLimit) {
      alert('Income exceeds the limit!');
      return;
    }
    if (type === 'expenses' && expenses + amount > budgetLimits.expensesLimit) {
      alert('Expenses exceed the limit!');
      return;
    }
    if (type === 'savings' && savings + amount > budgetLimits.savingsGoal) {
      alert('Savings goal reached!');
      return;
    }

    if (type === 'income') setIncome(prev => prev + amount);
    if (type === 'expenses') setExpenses(prev => prev + amount);
    if (type === 'savings') setSavings(prev => prev + amount);

    updateMonthlyData(currentMonth, type, amount);
    addTransaction(type, amount);
  };

  const netBalance = income - expenses;

  return (
    <div className="min-h-screen bg-surface-50">
      {/* ─── TOP NAVIGATION BAR ─── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 tracking-tight">FinanceTracker</h1>
                <p className="text-xs text-gray-400 -mt-0.5 hidden sm:block">Personal Dashboard</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <div className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                netBalance >= 0
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
                  : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'
              }`}>
                Net: ${netBalance.toLocaleString()}
              </div>
              <div className="w-px h-6 bg-gray-200 mx-2" />
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                    resetData();
                  }
                }}
                className="btn-danger text-xs px-3 py-1.5"
              >
                <svg className="w-3.5 h-3.5 mr-1.5 inline" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                </svg>
                Reset
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="px-4 py-3 space-y-2">
              <div className={`px-4 py-2 rounded-xl text-sm font-semibold text-center ${
                netBalance >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
                Net Balance: ${netBalance.toLocaleString()}
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all data?')) {
                    resetData();
                  }
                  setMobileMenuOpen(false);
                }}
                className="btn-danger w-full text-center justify-center"
              >
                Reset All Data
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        <section className="animate-fade-in">
          <BudgetSettings />
        </section>

        <section className="animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <IncomeCard income={income} handleAdd={handleAdd} />
            <ExpenseCard expenses={expenses} handleAdd={handleAdd} />
            <SavingsCard savings={savings} handleAdd={handleAdd} budgetLimits={budgetLimits} />
          </div>
        </section>

        <section>
          <MonthlyTotals />
        </section>

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FinanceChart />
            <MonthlyBarChart />
          </div>
        </section>

        <section>
          <TransactionLog />
        </section>

        <section>
          <ExportCSV />
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200/60 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">Personal Finance Tracker</p>
          <p className="text-xs text-gray-400">Data stored locally in your browser</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
