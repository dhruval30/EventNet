import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../api/axios'

function EventRoom() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedAttendee, setSelectedAttendee] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setEvent(res.data)
      } catch (err) {
        alert('Event not found or unauthorized')
        navigate('/dashboard')
      }
    }

    fetchEvent()
  }, [id, navigate])

  // Placeholder for match data - will be dynamic later
  const matchData = [
    { id: 2, matchPercentage: 87, interests: ['AI', 'Web Development', 'Product Management'] },
    { id: 5, matchPercentage: 74, interests: ['UX Design', 'Marketing', 'Data Science'] },
    { id: 8, matchPercentage: 68, interests: ['Blockchain', 'Startups', 'Venture Capital'] }
  ]

  const handleAttendeeClick = (person) => {
    setSelectedAttendee(person)
  }

  const closeModal = () => {
    setSelectedAttendee(null)
  }

  if (!event) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-48 bg-slate-700 rounded mb-4"></div>
        <div className="h-4 w-64 bg-slate-800 rounded"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-white">
      {/* Header Section */}
      <header className="border-b border-slate-800 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                {event.title}
              </h1>
              <p className="text-gray-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Event
                </span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  Options
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-6">
        {/* Tabs Navigation */}
        <nav className="flex border-b border-slate-800 mb-6">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              activeTab === 'all' 
                ? 'text-indigo-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            All Attendees
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              activeTab === 'matches' 
                ? 'text-indigo-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Your Matches 
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300">3</span>
            {activeTab === 'matches' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('starred')}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              activeTab === 'starred' 
                ? 'text-indigo-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Starred
            {activeTab === 'starred' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
            )}
          </button>
        </nav>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-lg bg-slate-800/50 focus:bg-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-colors"
              placeholder="Search by name, domain, or interest..."
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <option>All Domains</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>Design</option>
            </select>
            <button className="px-3 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-gray-300 hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Attendees Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {event.attendees.map((person, i) => {
            // Find if this person is in match data
            const matchInfo = matchData.find(m => m.id === i);
            const isMatch = !!matchInfo;
            
            return (
              <div 
                key={i} 
                onClick={() => handleAttendeeClick(person)}
                className={`bg-slate-800/70 backdrop-blur hover:bg-slate-800 transition-all p-5 rounded-xl border ${
                  isMatch ? 'border-indigo-500/50' : 'border-slate-700'
                } hover:shadow-md hover:shadow-indigo-500/5 cursor-pointer transform hover:-translate-y-1 duration-200`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xl font-bold">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{person.name}</h3>
                      <p className="text-sm text-indigo-400">{person.domain}</p>
                    </div>
                  </div>
                  
                  {isMatch && (
                    <div className="flex items-center">
                      <div className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg flex items-center gap-1 text-xs font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {matchInfo.matchPercentage}% Match
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-3">{person.college}</p>

                {person.bio && (
                  <p className="text-sm text-gray-400 italic mb-4 line-clamp-2">
                    "{person.bio}"
                  </p>
                )}

                {isMatch && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-400 mb-2">Common Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {matchInfo.interests.map((interest, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  {person.linkedInUrl && (
                    <a
                      href={person.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  <div className="flex gap-2">
                    <button 
                      className="p-1.5 rounded-full hover:bg-slate-700 transition-colors text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add star functionality here
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                    <button 
                      className="p-1.5 rounded-full hover:bg-slate-700 transition-colors text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add message functionality
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Attendee Profile Modal */}
      {selectedAttendee && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold">
                    {selectedAttendee.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedAttendee.name}</h2>
                    <p className="text-indigo-400">{selectedAttendee.domain}</p>
                    <p className="text-gray-400">{selectedAttendee.college}</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Extended profile info would go here */}
              <div className="space-y-6">
                {selectedAttendee.bio && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-300">{selectedAttendee.bio}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-3">Professional Experience</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h4 className="font-medium">Senior Product Manager</h4>
                      <p className="text-indigo-400 text-sm">Microsoft</p>
                      <p className="text-gray-400 text-sm">2020 - Present</p>
                      <p className="text-gray-300 text-sm mt-2">Led product development for cloud services, managing a team of 12 engineers and designers.</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h4 className="font-medium">Product Manager</h4>
                      <p className="text-indigo-400 text-sm">Google</p>
                      <p className="text-gray-400 text-sm">2017 - 2020</p>
                      <p className="text-gray-300 text-sm mt-2">Managed Android application features and coordinated with cross-functional teams.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills & Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm">Product Management</span>
                    <span className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm">UX Strategy</span>
                    <span className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm">Agile</span>
                    <span className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm">AI/ML</span>
                    <span className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm">Cloud Computing</span>
                    <span className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-full text-sm">Data Analysis</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Events Attended</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                      <p className="font-medium">TechCrunch Disrupt</p>
                      <p className="text-gray-400 text-sm">September 2024</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                      <p className="font-medium">Product School Conference</p>
                      <p className="text-gray-400 text-sm">July 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                {selectedAttendee.linkedInUrl && (
                  <a
                    href={selectedAttendee.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg flex-1 justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                    View LinkedIn Profile
                  </a>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg flex-1 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventRoom