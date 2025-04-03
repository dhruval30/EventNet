function UserProfileModal({ user, onClose }) {
    if (!user) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <div 
          className="relative bg-gray-800/90 border border-gray-700/50 rounded-xl shadow-2xl max-w-md w-full text-gray-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 px-6 py-4 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Profile Details</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold tracking-wide mt-3">{user.name}</h2>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mt-1">
                {user.domain}
              </span>
            </div>
  
            {/* Profile Details */}
            <div className="space-y-5">
              {/* Bio */}
              {user.bio && (
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-400 uppercase">About</h3>
                  </div>
                  <p className="text-md italic text-gray-300">
                    "{user.bio}"
                  </p>
                </div>
              )}
  
              {/* College */}
              <div className="flex">
                <div className="w-1/2 pr-2">
                  <div className="flex items-center mb-1">
                    <svg className="w-4 h-4 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-400">College</h3>
                  </div>
                  <p className="text-md pl-6">{user.college || 'Not specified'}</p>
                </div>
  
                {/* Added field for location if available */}
                <div className="w-1/2 pl-2">
                  <div className="flex items-center mb-1">
                    <svg className="w-4 h-4 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-400">Location</h3>
                  </div>
                  <p className="text-md pl-6">{user.location || 'Not specified'}</p>
                </div>
              </div>
  
              {/* Contact Links */}
              <div className="pt-4 border-t border-gray-700/50 mt-3">
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                  <svg className="w-4 h-4 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Social Profiles
                </h3>
                <div className="flex justify-center space-x-3">
                  {user.linkedInUrl && (
                    <a
                      href={user.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700/80 hover:bg-blue-700 transition-colors p-2 rounded-lg shadow-md text-white"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Action buttons */}
          <div className="px-6 py-4 border-t border-gray-700/50 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700/70 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-colors"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default UserProfileModal;