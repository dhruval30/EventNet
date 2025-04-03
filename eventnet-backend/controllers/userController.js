import Event from '../models/Event.js'
import User from '../models/User.js'

export const updateProfile = async (req, res) => {
    const userId = req.user._id

  const { name, college, domain, bio, linkedInUrl } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        college,
        domain,
        bio,
        linkedInUrl,
        profileComplete: true
      },
      { new: true }
    )

    res.status(200).json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileComplete: updatedUser.profileComplete
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' })
  }
}

export const getDashboardData = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).select('-password')

    const today = new Date()

    // 🆕 Get upcoming events sorted by date
    const upcomingEvents = await Event.find({ date: { $gte: today } })
      .sort({ date: 1 })
      .limit(5)

    // 🆕 Get people suggestions (filtered)
    const suggestions = await User.find({
      _id: { $ne: req.user.id }
    })
    .limit(5)
    .select('name domain college linkedInUrl bio')

    const getProfileCompletion = (user) => {
      const fields = ['name', 'college', 'domain', 'bio', 'linkedInUrl']
      const filled = fields.filter(field => user[field] && user[field].trim() !== '')
      return Math.round((filled.length / fields.length) * 100)
    }
    
    const profileCompletion = getProfileCompletion(currentUser)

const dashboardData = {
  name: currentUser.name,
  email: currentUser.email,
  profileComplete: currentUser.profileComplete,
  profileCompletion: `${profileCompletion}%`, // <- now dynamic!
  eventCount: currentUser.eventsJoined?.length || 0,
  connectionCount: currentUser.connections?.length || 0,
  upcomingEventsCount: upcomingEvents.length,
  upcomingEvents,
  suggestions,
  profileTasks: [
    { name: 'Profile Picture', status: 'completed' },
    { name: 'Basic Information', status: profileCompletion >= 20 ? 'completed' : 'pending' },
    { name: 'Professional Details', status: profileCompletion >= 40 ? 'partial' : 'pending' },
    { name: 'Interests & Skills', status: profileCompletion >= 60 ? 'partial' : 'pending' },
    { name: 'Privacy Settings', status: profileCompletion >= 80 ? 'completed' : 'pending' }
  ]
}


    res.json(dashboardData)
  } catch (err) {
    console.error('Dashboard error:', err)
    res.status(500).json({ message: 'Failed to load dashboard' })
  }
}

// userController.js
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load profile' })
  }
}
