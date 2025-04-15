import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './pages/LoginForm'
import CreateAccount from './pages/CreateAccount';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  </Router>
  )
}

export default App
