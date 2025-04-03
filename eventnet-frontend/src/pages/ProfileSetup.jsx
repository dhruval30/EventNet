import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Button from '../components/Button'
import Input from '../components/Input'

function ProfileSetup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [domain, setDomain] = useState('')
  const [bio, setBio] = useState('')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { name, college, domain, bio, linkedInUrl } = res.data
        setName(name || '')
        setCollege(college || '')
        setDomain(domain || '')
        setBio(bio || '')
        setLinkedInUrl(linkedInUrl || '')
      } catch (err) {
        console.error('Failed to fetch user profile:', err)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.put(
        '/users/profile',
        { name, college, domain, bio, linkedInUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // ✅ Update localStorage with new user info
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      alert('Could not update profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-white">
      {/* Decorative Blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -left-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 sm:p-10 relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-700">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500" style={{ width: '80%' }}></div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Complete Your Profile</h2>
          <p className="text-slate-400">Share some details to personalize your experience</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white"
            labelClassName="block text-sm font-medium mb-2 text-indigo-300"
          />

          <Input
            label="College / Company"
            value={college}
            onChange={e => setCollege(e.target.value)}
            placeholder="Where are you from?"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white"
            labelClassName="block text-sm font-medium mb-2 text-indigo-300"
          />

          <Input
            label="Domain / Area of Interest"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            placeholder="e.g., Web Dev, AI, Design"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white"
            labelClassName="block text-sm font-medium mb-2 text-indigo-300"
          />

          <div>
            <label className="block text-sm font-medium mb-2 text-indigo-300">Short Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white"
              placeholder="Tell us a bit about yourself..."
              rows="3"
            />
          </div>

          <Input
            label="LinkedIn URL"
            value={linkedInUrl}
            onChange={e => setLinkedInUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            type="url"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white"
            labelClassName="block text-sm font-medium mb-2 text-indigo-300"
          />
        </div>

        <div className="mt-8 space-y-3">
          <Button
            text={loading ? "Saving..." : "Save Profile"}
            onClick={handleSubmit}
            className="w-full py-3 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500"
            disabled={loading}
            loading={loading}
          />

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 px-4 rounded-xl font-medium border border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-indigo-400 transition"
          >
            Skip for now
          </button>
        </div>
      </div>

      <div className="w-full max-w-lg mt-6 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
        <p className="text-slate-400 text-sm">Your profile helps us personalize your experience</p>
      </div>
    </div>
  )
}

export default ProfileSetup
