'use client'
import React, { createContext, useState, ReactNode } from 'react'

const initialContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentUser: '',
  setCurrentUser: () => {},
}

type AuthContextValuesType = {
  isLoggedIn: boolean
  currentUser: string
}

type AuthContextType = AuthContextValuesType & {
  setIsLoggedIn: (state: boolean) => void
  setCurrentUser: (user: string) => void
}
export const AuthContext = createContext<AuthContextType>(initialContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
