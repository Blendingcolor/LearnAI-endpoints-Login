import { useState, useEffect, ReactNode } from 'react'
import { AuthContext } from './AuthContext';

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  getUser: () => User | null;
  userIsAuthenticated: () => boolean;
  userLogin: (user: User) => void;
  userLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
    setUser(storedUser)
  }, [])

  const getUser = (): User | null => {
    return JSON.parse(localStorage.getItem('user') || 'null')
  }

  const userIsAuthenticated = (): boolean => {
    return localStorage.getItem('user') !== null
  }

  const userLogin = (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const userLogout = (): void => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const contextValue: AuthContextType = {
    user,
    getUser,
    userIsAuthenticated,
    userLogin,
    userLogout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

