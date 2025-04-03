import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profileComplete: false // default until they fill the profile setup form
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileComplete: newUser.profileComplete
      },
      token
    })

  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete // must be included
      },
      token
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}