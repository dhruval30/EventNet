import Event from '../models/Event.js'

export const createEvent = async (req, res) => {
  const { title, date, time, location, code } = req.body

  if (!title || !date || !time || !location || !code) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const newEvent = new Event({ title, date, time, location, code, attendees: [] })
    await newEvent.save()
    res.status(201).json({ message: 'Event created successfully', event: newEvent })
  } catch (err) {
    console.error('Event creation failed:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
