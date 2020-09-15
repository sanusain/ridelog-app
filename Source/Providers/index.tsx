import React from "react"
import { YellowBox } from "react-native"
import { AuthProvider } from "../Contexts/AuthProvider"
import Providers from "./Providers"

const InitialProvider = () => {
  YellowBox.ignoreWarnings(["Setting a timer"]) // for timebeing added, there no fix
  return (
    <AuthProvider>
      <Providers />
    </AuthProvider>
  )
}

export default InitialProvider
