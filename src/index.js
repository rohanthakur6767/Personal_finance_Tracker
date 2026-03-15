import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FinancialProvider } from './context/FinancialContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FinancialProvider>
    <App />
  </FinancialProvider>
);


