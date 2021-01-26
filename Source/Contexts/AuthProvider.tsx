import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useState} from 'react'
import {getRealmInstance} from '../Database'

export type User = {
  _id: string
  callsign: string
  email: string
  password?: string
  authToken?: string
  avatar?: string
} | null

let globalUser: User

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
  const realm = getRealmInstance()
  const [user, setUser] = useState<User>(null)
  globalUser = user
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
          realm.write(() => {
            realm.deleteAll()
          })
          await AsyncStorage.removeItem('user')
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function getAuthToken(): string | undefined {
  if (globalUser) return globalUser.authToken
  return undefined
}

export function getAuthUserId(): string | null {
  if (globalUser) return globalUser._id
  return null
}
