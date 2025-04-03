import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Button from '../components/Button'
import Input from '../components/Input'




function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const res = await axios.post('/auth/signup', {
        name,
        email,
        password
      })
  
      console.log('Signup success:', res.data)
      localStorage.setItem('token', res.data.token)
  
      // Redirect to dashboard
      const { profileComplete } = res.data.user

if (profileComplete) {
  navigate('/dashboard')
} else {
  navigate('/profile-setup')
}

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Signup failed'
      
      if (errorMsg === 'User already exists') {
        alert('An account with this email already exists. Please log in instead.')
        navigate('/login')
      } else {
        alert(errorMsg)
      }
  
      console.error('Signup failed:', errorMsg)
    }
  }
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-indigo-700 blur-3xl"></div>
      </div>


      <div className="w-full max-w-md bg-card/30 backdrop-blur-xl border border-border/40 rounded-2xl shadow-xl p-8 sm:p-10 z-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create an Account
          </h2>
          <p className="text-text-secondary">Join EventNet and connect with your people</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-text-secondary ml-1">Full Name</label>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-bg-secondary/50 border border-border/50 focus:border-accent/70 rounded-lg p-3 w-full text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-bg-secondary/50 border border-border/50 focus:border-accent/70 rounded-lg p-3 w-full text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-bg-secondary/50 border border-border/50 focus:border-accent/70 rounded-lg p-3 w-full text-text-primary"
            />
          </div>
        </div>

        <div className="mt-8">
          <Button 
            text="Sign Up" 
            onClick={handleSignup} 
            className="w-full py-3 bg-gradient-to-r from-accent to-indigo-500 hover:from-indigo-600 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-accent/20 transition duration-300"
          />
        </div>

        <p className="text-sm text-text-secondary mt-8 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-indigo-400 transition font-medium">
            Log in
          </Link>
        </p>
      </div>

      <p className="text-xs text-text-secondary mt-8">
        © 2025 EventNet. All rights reserved.
      </p>
    </div>
  )
}

export default Signup
