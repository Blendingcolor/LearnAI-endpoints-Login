import { createContext } from 'react'

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

export const AuthContext = createContext<AuthContextType | undefined>(undefined)