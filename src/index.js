import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Adder from "./components/adder"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/signup';
import Login from './components/login';
import Account from './components/account'
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<Adder />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider >
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
