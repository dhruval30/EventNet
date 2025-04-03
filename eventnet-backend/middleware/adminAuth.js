const adminAuth = (req, res, next) => {
    const token = req.headers['x-admin-token']
  
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ message: 'Forbidden: Invalid admin token' })
    }
  
    next()
  }
  
  export default adminAuth
  