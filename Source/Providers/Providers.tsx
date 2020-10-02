import { NavigationContainer } from "@react-navigation/native"
import * as Font from "expo-font"
import * as SecureStore from "expo-secure-store"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { Provider as PaperProvider } from "react-native-paper"
import { Provider } from "react-redux"
import { appFonts } from "../Assets/Fonts/index"
import SafeAreaView from "../Components/SafeAreaView"
import { AuthContext } from "../Contexts/AuthProvider"
import AppNavigation from "../Navigation"
import AuthStack from "../Navigation/AuthStack"
import { getStore } from "../State-management"

export default function Providers() {
  const store = getStore()
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const { user, login } = useContext(AuthContext)

  // initializing App
  useEffect(() => {
    getFonts()
    if (!user) getUser()
  }, [])

  const getFonts = async () => {
    await Font.loadAsync(appFonts)
    setFontsLoaded(true)
  }

  const getUser = async () => {
    SecureStore.getItemAsync("user")
      .then((data) => {
        if (data) login(JSON.parse(data))
      })
      .catch((error) => console.log("couldnt log user in", error))
  }

  return fontsLoaded ? (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaView>
            {user ? <AppNavigation /> : <AuthStack />}
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  ) : (
    <ActivityIndicator size={"large"} />
  )
}
