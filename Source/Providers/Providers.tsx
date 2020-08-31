import { NavigationContainer } from "@react-navigation/native"
import * as Font from "expo-font"
import * as SecureStore from "expo-secure-store"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { Provider } from "react-redux"
import { appFonts } from "../Assets/Fonts/index"
import SafeAreaView from "../Components/SafeAreaView"
import { AuthContext } from "../Contexts/AuthProvider"
import AuthStack from "../Navigation/AuthStack"
import BottomTabsNavigator from "../Navigation/BottomTabs"
import { getStore } from "../State-management"

export default function Providers() {
  const store = getStore()
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const { user, login } = useContext(AuthContext)

  // initializing App
  useEffect(() => {
    getFonts()
    if (user) getUser()
  }, [])

  const getUser = async () => {
    SecureStore.getItemAsync("user")
      .then((data) => {
        if (data) login(JSON.parse(data))
      })
      .catch((error) => console.log("error", error))
  }

  const getFonts = async () => {
    await Font.loadAsync(appFonts)
    setFontsLoaded(true)
  }

  return fontsLoaded ? (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView>
          {user ? <BottomTabsNavigator /> : <AuthStack />}
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  ) : (
    <ActivityIndicator size={"large"} />
  )
}
