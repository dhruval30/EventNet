import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Button from '../components/Button'
import Input from '../components/Input'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', { email, password })

      const { token, user } = res.data
      console.log('Login success:', user)

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // Redirect based on profile status
      if (user.profileComplete) {
        navigate('/dashboard')
      } else {
        navigate('/profile-setup')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed'
      alert(errorMsg)
      console.error('Login error:', errorMsg)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4 relative overflow-hidden">
      {/* Glowy background blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-indigo-700 blur-3xl"></div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-card/30 backdrop-blur-xl border border-border/40 rounded-2xl shadow-xl p-8 sm:p-10 z-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-text-secondary">Sign in to your EventNet account</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-8">
          <Button
            text="Sign In"
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-accent to-indigo-500 hover:from-indigo-600 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-accent/20 transition duration-300"
          />
        </div>

        <p className="text-sm text-text-secondary mt-8 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent hover:text-indigo-400 transition font-medium">
            Sign up
          </Link>
        </p>
      </div>

      <p className="text-xs text-text-secondary mt-8">© 2025 EventNet. All rights reserved.</p>
    </div>
  )
}

export default Login
