import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

// localStorage.setItem('loggedIn', false);
// localStorage.setItem('user', JSON.stringify([]));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
