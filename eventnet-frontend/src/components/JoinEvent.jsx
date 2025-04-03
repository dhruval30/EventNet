import { useState } from 'react'
import axios from '../api/axios'

function JoinEvent() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('/events/join', { code }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage(`Joined: ${res.data.event.title}`)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error joining event')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Enter Event Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Event code"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-accent text-white rounded hover:bg-indigo-600">
          Join Event
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}

export default JoinEvent
