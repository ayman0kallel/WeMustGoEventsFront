import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './config/routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>,
)
