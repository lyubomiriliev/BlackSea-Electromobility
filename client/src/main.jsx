import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { app } from "./firebase.config.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider app={app}>
    <App />
  </Provider>
)
