import { createContext, useCallback, useContext, useState } from "react";
import api from "src/services/api";
import Cookies from 'js-cookie'

interface AuthState {
  token: string;
  user: any;
}

interface SignInCredentials {
  email?: string;
  password?: string;
  phone_number?: string;
}

interface AuthContextData {
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  saveOnCookies(credentials: AuthState): Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@Lavimco:token')    
    const user = Cookies.get('@Lavimco:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const saveOnCookies = useCallback(async ({ token, user }: AuthState) => {
    Cookies.set('@Lavimco:token', token)    
    Cookies.set('@Lavimco:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])
  
  const signIn = useCallback(async ({ email, password, phone_number }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    Cookies.set('@Lavimco:token', token)    
    Cookies.set('@Lavimco:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    Cookies.remove('@Lavimco:token')    
    Cookies.remove('@Lavimco:user')

    setData({} as AuthState)
  }, [])
  
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, saveOnCookies }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}