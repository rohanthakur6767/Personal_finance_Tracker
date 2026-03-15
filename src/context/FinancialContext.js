import React, { createContext, useState, useContext, useEffect } from 'react';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [income, setIncome] = useState(() => Number(localStorage.getItem('income')) || 0);
  const [expenses, setExpenses] = useState(() => Number(localStorage.getItem('expenses')) || 0);
  const [savings, setSavings] = useState(() => Number(localStorage.getItem('savings')) || 0);

  const [monthlyData, setMonthlyData] = useState(() => {
    const data = localStorage.getItem('monthlyData');
    return data ? JSON.parse(data) : Array(12).fill({ income: 0, expenses: 0, savings: 0 });
  });

  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  });

  const [budgetLimits, setBudgetLimits] = useState(() => {
    const savedLimits = localStorage.getItem('budgetLimits');
    return savedLimits
      ? JSON.parse(savedLimits)
      : {
          incomeLimit: 5000,
          expensesLimit: 3000,
          savingsGoal: 2000,
        };
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('income', income);
    localStorage.setItem('expenses', expenses);
    localStorage.setItem('savings', savings);
    localStorage.setItem('monthlyData', JSON.stringify(monthlyData));
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [income, expenses, savings, monthlyData, transactions]);

  useEffect(() => {
    localStorage.setItem('budgetLimits', JSON.stringify(budgetLimits));
  }, [budgetLimits]);

  // Update bar chart data per month
  const updateMonthlyData = (monthIndex, type, amount) => {
    const updated = [...monthlyData];
    updated[monthIndex] = {
      ...updated[monthIndex],
      [type]: updated[monthIndex][type] + amount,
    };
    setMonthlyData(updated);
  };

  // Add new transaction
  const addTransaction = (type, amount) => {
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      date: new Date().toLocaleDateString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // Update a transaction
  const updateTransaction = (id, updatedFields) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedFields } : tx))
    );
  };

  // Update budget limits from user input
  const updateBudgetLimits = (newLimits) => {
    setBudgetLimits((prev) => ({
      ...prev,
      ...newLimits,
    }));
  };
  
  const resetData = () => {
    setIncome(0);
    setExpenses(0);
    setSavings(0);
    setMonthlyData(Array(12).fill({ income: 0, expenses: 0, savings: 0 }));
    setTransactions([]);
    setBudgetLimits({
      incomeLimit: 5000,
      expensesLimit: 3000,
      savingsGoal: 2000,
    });
    localStorage.clear(); // Optional: reset all
  };
   
  return (
    <FinancialContext.Provider
      value={{
        income,
        setIncome,
        expenses,
        setExpenses,
        savings,
        setSavings,
        monthlyData,
        updateMonthlyData,
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budgetLimits,
        updateBudgetLimits,
        resetData
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancialContext = () => useContext(FinancialContext);
