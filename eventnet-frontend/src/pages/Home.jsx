import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* IMPROVED NAVBAR */}
      <nav className="w-full px-6 sm:px-16 py-6 border-b border-border/30 backdrop-blur-md sticky top-0 z-10 bg-bg-primary/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Event<span className="text-accent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">Net</span>
          </h1>
          
          
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm sm:text-base px-4 py-2 rounded-md text-text-secondary hover:text-white transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="text-sm sm:text-base px-5 py-2.5 rounded-md bg-gradient-to-r from-accent to-indigo-500 hover:from-indigo-600 hover:to-indigo-500 text-white font-medium transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 py-24 sm:py-32 max-w-4xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-indigo-700 blur-3xl"></div>
        </div>
        
        <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full mb-8">
          Networking Reimagined
        </span>
        
        <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Connect With Like-Minded People at Events
        </h2>
        
        <p className="text-text-secondary text-base sm:text-xl mb-10 max-w-2xl">
          EventNet helps you meet attendees who share your interests before the event even begins. Join meaningful conversations and build valuable connections.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Link to="/signup">
            <button className="w-full px-8 py-4 bg-accent hover:bg-indigo-600 text-white font-medium rounded-lg shadow-lg shadow-accent/20 transition duration-300 flex items-center justify-center">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
          <Link to="/learn-more">
            <button className="w-full px-8 py-4 bg-transparent border border-border hover:border-accent/50 text-text-primary font-medium rounded-lg transition duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home