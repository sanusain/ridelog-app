import React from "react"
import { AuthProvider } from "../Contexts/AuthProvider"
import Providers from "./Providers"

const InitialProvider = () => {
  return (
    <AuthProvider>
      <Providers />
    </AuthProvider>
  )
}

export default InitialProvider
