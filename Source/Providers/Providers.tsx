import { NavigationContainer } from "@react-navigation/native"
import * as Font from "expo-font"
import React, { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { Provider } from "react-redux"
import { appFonts } from "../Assets/Fonts/index"
import SafeAreaView from "../Components/SafeAreaView"
import AuthStack from "../Navigation/AuthStack"
import { getStore } from "../State-management"

export default function Providers() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const store = getStore()

  useEffect(() => {
    getFonts()
  }, [])

  const getFonts = async () => {
    await Font.loadAsync(appFonts)
    setFontsLoaded(true)
  }

  return fontsLoaded ? (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView>
          {/* <BottomTabsNavigator /> */}
          {/* <GetStarted /> */}
          {/* <SignIn /> */}
          {/* <SignUp /> */}
          <AuthStack />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  ) : (
    <ActivityIndicator />
  )
}
