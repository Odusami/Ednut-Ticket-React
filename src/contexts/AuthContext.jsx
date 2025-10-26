import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        const userData = JSON.parse(session)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('ticketapp_session')
      }
    }
  }, [])

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: 1,
            email,
            name: email.split('@')[0],
            firstLetter: email[0],
          }
          localStorage.setItem('ticketapp_session', JSON.stringify(userData))
          setUser(userData)
          setIsAuthenticated(true)
          showToast('Login successful!', 'success')
          resolve(userData)
        } else {
          showToast('Invalid credentials', 'error')
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const signup = async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const userData = {
            id: Date.now(),
            email,
            name
          }
          localStorage.setItem('ticketapp_session', JSON.stringify(userData))
          setUser(userData)
          setIsAuthenticated(true)
          showToast('Account created successfully!', 'success')
          resolve(userData)
        } else {
          showToast('Please fill all fields', 'error')
          reject(new Error('Please fill all fields'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    setUser(null)
    setIsAuthenticated(false)
    showToast('Logged out successfully', 'info')
    navigate('/')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    toast,
    showToast
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}