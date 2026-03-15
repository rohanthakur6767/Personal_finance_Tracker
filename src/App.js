import React from 'react';
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

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md p-4 flex items-center justify-between rounded-b-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-white text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center">
            💰
          </div>
          <h1 className="text-2xl font-bold tracking-wide">
            Personal Finance Tracker
          </h1>
        </div>

        <div className="flex gap-3">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
            Dashboard
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all data?')) {
                resetData();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
          >
            Reset All Data
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="p-6">
        <BudgetSettings />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <IncomeCard income={income} handleAdd={handleAdd} />
          <ExpenseCard expenses={expenses} handleAdd={handleAdd} />
          <SavingsCard
            savings={savings}
            handleAdd={handleAdd}
            budgetLimits={budgetLimits}
          />
        </div>

        <FinanceChart />
        <MonthlyTotals />
        <MonthlyBarChart />
        <TransactionLog />
        <ExportCSV />
      </main>
    </div>
  );
}

export default App;
