import { useState } from 'react'
import axios from '../api/axios'

function AdminPage() {
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    code: ''
  })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    try {
      const res = await axios.post('/admin/create-event', form, {
        headers: {
          'x-admin-token': 'supersecrettoken123'
        }
      })
      setMessage(` ${res.data.message}`)
      setForm({ title: '', date: '', time: '', location: '', code: '' })
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center px-4">
      <div className="bg-bg-primary/70 border border-border/30 p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Admin Panel — Create Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'date', 'time', 'location', 'code'].map((field) => (
            <input
              key={field}
              type={field === 'date' ? 'date' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              className="w-full px-4 py-2 border border-border rounded bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-indigo-500 text-white py-2 rounded-md font-medium hover:from-indigo-600 hover:to-indigo-500 transition"
          >
            Create Event
          </button>
        </form>

        {message && <p className="mt-4 text-green-400 text-sm">{message}</p>}
        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  )
}

export default AdminPage
