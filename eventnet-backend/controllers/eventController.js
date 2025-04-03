import Event from '../models/Event.js'
import User from '../models/User.js'

export const joinEvent = async (req, res) => {
  const { eventId, code } = req.body
  const userId = req.user.id

  try {
    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ message: 'Event not found' })
    if (event.code !== code) return res.status(401).json({ message: 'Invalid event code' })

    const user = await User.findById(userId)

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId)
      await event.save()
    }

    if (!user.eventsJoined.includes(eventId)) {
      user.eventsJoined.push(eventId)
      await user.save()
    }

    res.status(200).json({
      message: 'Joined successfully',
      eventId: event._id
    })
  } catch (err) {
    console.error('Join event error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}


export const getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name domain college bio linkedInUrl')
    if (!event) return res.status(404).json({ message: 'Event not found' })

    res.status(200).json({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      attendees: event.attendees
    })
  } catch (err) {
    console.error('Get attendees error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      'attendees',
      'name domain college bio linkedInUrl'
    )

    if (!event) return res.status(404).json({ message: 'Event not found' })

    res.status(200).json({
      id: event._id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      attendees: event.attendees
    })
  } catch (err) {
    console.error('Error fetching event details:', err)
    res.status(500).json({ message: 'Server error' })
  }
}