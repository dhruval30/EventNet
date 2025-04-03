function Input({ type, placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-md bg-bg-secondary text-text-primary placeholder-text-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent transition"
      />
    )
  }
  
  export default Input
  