function Button({ text, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full mt-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-indigo-600 transition-all"
      >
        {text}
      </button>
    )
  }
  
  export default Button
  