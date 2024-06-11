import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProblemContextProvider } from './context/ProblemContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProblemContextProvider>
        <App />
      </ProblemContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


