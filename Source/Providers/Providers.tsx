import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import React from "react"
import { ActivityIndicator } from "react-native"
import { Provider } from "react-redux"
import { appFonts } from "../Assets/Fonts/index"
import SafeAreaView from "../Components/SafeAreaView"
import SignUp from "../Screens/Auth/signup"
import { getStore } from "../State-management"

export default function Providers() {
  const store = getStore()

  let [fontsLoaded] = useFonts(appFonts)

  return fontsLoaded ? (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView>
          {/* <BottomTabsNavigator /> */}
          {/* <GetStarted /> */}
          {/* <SignIn /> */}
          <SignUp />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  ) : (
    <ActivityIndicator />
  )
}
