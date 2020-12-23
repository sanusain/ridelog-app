import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useState} from 'react'
import {dbRemoveUser} from '../Database/jobs'

export type User = {
  _id: string
  callsign: string
  email: string
  password?: string
  authToken?: string
  avatar?: string
} | null

export const AuthContext = React.createContext<{
  user: User
  login: (user: User) => void
  logout: () => void
}>({
  user: null,
  login: () => {
    console.log('AuthContext not initialized')
  },
  logout: () => {
    console.log('AuthContext not initialized')
  },
})

type Props = {children: any}

export const AuthProvider: React.FunctionComponent<Props> = (props) => {
  const [user, setUser] = useState<User>(null)
  return (
    <AuthContext.Provider
      value={{
        user,
        login: (suppliedUser: User) => {
          if (suppliedUser) {
            setUser(suppliedUser)
            AsyncStorage.setItem('user', JSON.stringify(suppliedUser))
          }
        },
        logout: async () => {
          setUser(null)
          await AsyncStorage.removeItem('user')
          await dbRemoveUser(user)
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const getAuthToken = async (): Promise<string | null> => {
  let token: string | undefined
  const JsonUser = await AsyncStorage.getItem('user')
  const user: User = JSON.parse(JsonUser || '')
  if (user) {
    token = user.authToken || ''
    return token
  }
  return null
}
