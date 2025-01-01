import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { clubapi } from './Redux/services/clubapi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider api={clubapi}>
        <App />
    </ApiProvider>
  </React.StrictMode>
);
