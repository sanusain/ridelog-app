import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { Provider } from "react-redux"
import SafeAreaView from "../Components/SafeAreaView"
import GetStarted from "../Screens/Auth/get-started"
import { getStore } from "../State-management"

export default function Providers() {
  const store = getStore()

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView>
          {/* <BottomTabsNavigator /> */}
          <GetStarted />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  )
}
