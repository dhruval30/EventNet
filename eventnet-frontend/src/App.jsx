// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import Dashboard from './pages/Dashboard'
import EventRoom from './pages/EventRoom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProfileSetup from './pages/ProfileSetup'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/events/:id" element={<EventRoom />} />
          <Route path="/admin" element={<AdminPage />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
