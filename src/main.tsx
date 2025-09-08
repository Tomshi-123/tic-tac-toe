import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Stars from './Stars';  // Se till att Stars.tsx finns i samma mapp som denna fil
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Flyttad hit från App.tsx

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Stars />
    <App />
  </React.StrictMode>
);