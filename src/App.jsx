import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm'
import CreateAccount from './pages/CreateAccount';
import DashboardPage from './pages/DashboardPage';
import ArtsAndCultureHosting from './templates/ArtsAndCultureHosting';
import EventHosting from './templates/EventsHosting';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/host-festival" element={<ArtsAndCultureHosting />} />
      <Route path="/host-event" element={<EventHosting />} />
    </Routes>
  </Router>
  )
}

export default App
