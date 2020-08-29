import * as SecureStore from "expo-secure-store"
import React, { useState } from "react"

export type User = {
  uid: string
  callsign: string
  emailId: string
  avatar?: string
} | null

export const AuthContext = React.createContext<{
  user: User
  login: (user: User) => void
  logout: () => void
}>({
  user: null,
  login: () => {
    console.log("AuthContext not initialized")
  },
  logout: () => {
    console.log("AuthContext not initialized")
  },
})

type Props = {}
export const AuthProvider: React.FunctionComponent<Props> = (props) => {
  const [user, setUser] = useState<User>(null)
  return (
    <AuthContext.Provider
      value={{
        user,
        login: (suppliedUser: User) => {
          if (suppliedUser) {
            setUser(suppliedUser)
            SecureStore.setItemAsync("user", JSON.stringify(suppliedUser))
          }
        },
        logout: () => {
          setUser(null)
          SecureStore.deleteItemAsync("user")
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
