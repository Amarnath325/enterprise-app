import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// import HomePage from './pages/HomePage' // not used now
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import BusinessManagement from './pages/admin/business/BusinessManagement'
import BusinessSetup from './pages/admin/business/BusinessSetup'
import HomePage from './pages/HomePage'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses/setup" element={<BusinessSetup />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage onSignUp={handleLogin} />}
        />
        <Route
          path="/businesses"
          element={token ? <BusinessManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/businesses/setup"
          element={token ? <BusinessSetup /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
