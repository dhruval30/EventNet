import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import UserProfileModal from '../components/UserProfileModal'

function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState(null)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const navigate = useNavigate()

  const openProfile = (person) => setSelectedPerson(person)
  const closeProfile = () => setSelectedPerson(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/users/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setDashboardData(res.data)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
        alert('Could not load dashboard. Please try again.')
      }
    }

    fetchDashboardData()
  }, [user, navigate])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/login')
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarOpen &&
        e.target.closest('aside') === null &&
        !e.target.closest('button[aria-label="Toggle menu"]')) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [sidebarOpen])

  const handleJoinEvent = async (eventId, alreadyJoined) => {
    console.log('Joining event ID:', eventId)
  
    if (alreadyJoined) {
      navigate(`/events/${eventId}`)
      return
    }
  
    const code = prompt('Enter the event code to join:')
    if (!code) return
  
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('/events/join', { eventId, code }, {
        headers: { Authorization: `Bearer ${token}` }
      })
  
      console.log('Join response:', res.data)
      navigate(`/events/${res.data.eventId}`)
    } catch (err) {
      console.error('Join failed:', err)
      alert(err.response?.data?.message || 'Failed to join event')
    }
  }
  
  
  

  if (!user || !dashboardData) return null

  const {
    profileCompletion,
    eventCount,
    connectionCount,
    upcomingEvents,
    suggestions
  } = dashboardData

  return (
    <div className="flex h-screen bg-gradient-to-br from-black-900 to-black-800 text-gray-100">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-black-800/90 backdrop-blur-lg border-r border-gray-700/50 shadow-xl z-30 transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold tracking-tight">
            Event<span className="text-indigo-400 bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Net</span>
          </h1>
        </div>

        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-medium">{user?.name || 'User'}</h3>
              <p className="text-xs text-gray-400">Member</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          <NavItem label="Dashboard" active onClick={() => {}} />
          <NavItem label="My Profile" onClick={() => navigate('/profile-setup')} />

          <NavItem label="Connections" onClick={() => {}} />
          <NavItem label="Messages" onClick={() => {}} />

          <h3 className="px-3 text-xs font-semibold text-gray-500 mt-8 mb-2 uppercase tracking-wider">Settings</h3>
          <NavItem label="Account" onClick={() => {}} />
          <NavItem label="Preferences" onClick={() => {}} />
          <button 
            onClick={handleLogout} 
            className="w-full text-left px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 bg-gray-800/80 backdrop-blur-md z-20 border-b border-gray-700/30 shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold tracking-tight">
              Event<span className="text-indigo-400 bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Net</span>
            </h1>
            <button 
              className="p-2 rounded-md hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/50" 
              onClick={toggleSidebar} 
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="border-b border-gray-700/30 pb-4">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
              <p className="text-gray-400">Here's what's happening with your network today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard 
                label="Profile" 
                value={`${profileCompletion}`} 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                color="indigo"
              />
              <StatCard 
                label="Events Joined" 
                value={eventCount} 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                color="purple"
              />
              <StatCard 
                label="Connections" 
                value={connectionCount} 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                color="blue"
              />
              <StatCard 
                label="Upcoming Events" 
                value={upcomingEvents?.length || 0} 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="cyan"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Events Column */}
              <div className="lg:col-span-2 space-y-6">
                <SectionCard title="Upcoming Events" 
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  <div className="space-y-3">
                    {upcomingEvents.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400">No upcoming events found.</p>
                        <button className="mt-3 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors">
                          Find Events
                        </button>
                      </div>
                    ) : (
                      upcomingEvents.map((event, i) => {
                        const alreadyJoined = event.attendees?.includes(user.id)
                      
                        return (
                          <button
                            key={i}
                            onClick={() => handleJoinEvent(event._id, alreadyJoined)}
                            className="w-full text-left p-4 rounded-lg bg-gray-800/50 border border-gray-700/40 hover:bg-gray-700/40 transition-colors shadow-md group"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{event.date} • {event.time}</p>
                                <p className="text-sm text-gray-400">{event.location}</p>
                              </div>
                              {!alreadyJoined && (
                                <div className="bg-indigo-500/20 text-indigo-400 py-1 px-3 rounded-full text-xs font-medium group-hover:bg-indigo-500/40 transition-colors">
                                  Join
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })
                      
                    )}
                  </div>
                </SectionCard>
              </div>

              {/* Suggestions Column */}
              <div className="space-y-6">
                <SectionCard 
                  title="People You May Know" 
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                >
                  {suggestions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <svg className="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-gray-400">No suggestions available</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {suggestions.map((person, i) => (
                        <div 
                          key={i} 
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/30 cursor-pointer transition-colors"
                          onClick={() => openProfile(person)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-medium">
                              {person.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-medium">{person.name}</h4>
                              <p className="text-xs text-gray-400">{person.domain}</p>
                            </div>
                          </div>
                          <span className="text-indigo-400 hover:underline text-sm">View</span>
                        </div>
                      ))}

                      {suggestions.length > 0 && (
                        <button className="w-full mt-3 text-center py-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                          View more suggestions
                        </button>
                      )}
                    </div>
                  )}
                </SectionCard>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* User Profile Modal */}
      {selectedPerson && (
        <UserProfileModal user={selectedPerson} onClose={closeProfile} />
      )}
    </div>
  )
}

// Helper Components
const NavItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center space-x-2 transition-colors ${
      active 
        ? 'bg-indigo-500/20 text-indigo-400' 
        : 'text-gray-400 hover:bg-gray-700/30 hover:text-gray-100'
    }`}
  >
    <span>{label}</span>
  </button>
)

const StatCard = ({ label, value, icon, color }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      indigo: 'from-indigo-500/20 to-indigo-600/10 text-indigo-400',
      purple: 'from-purple-500/20 to-purple-600/10 text-purple-400',
      blue: 'from-blue-500/20 to-blue-600/10 text-blue-400',
      cyan: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400'
    }
    return colors[colorName] || colors.indigo
  }

  return (
    <div className={`rounded-xl bg-gradient-to-br ${getColorClasses(color)} p-px shadow-lg`}>
      <div className="bg-gray-800/90 rounded-xl p-4 h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`rounded-full p-2 bg-${color}-500/20`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

const SectionCard = ({ title, children, icon }) => (
  <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
    <div className="flex items-center space-x-2 border-b border-gray-700/30 p-4">
      {icon && <span className="text-gray-400">{icon}</span>}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
)

export default Dashboard