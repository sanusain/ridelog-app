import { NavigationContainer } from "@react-navigation/native"
import * as Font from "expo-font"
import * as SecureStore from "expo-secure-store"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { Provider as PaperProvider } from "react-native-paper"
import { Provider } from "react-redux"
import { appFonts } from "../Assets/Fonts/index"
import SafeAreaView from "../Components/SafeAreaView"
import Colors from "../Config/Colors"
import { AuthContext } from "../Contexts/AuthProvider"
import { InitDB, printLog } from "../Database"
import AppNavigation from "../Navigation"
import AuthStack from "../Navigation/AuthStack"
import { dispatchHandler, getStore } from "../State-management"

export default function Providers() {
  const store = getStore()
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const { user, login } = useContext(AuthContext)
  const [isAppReady, setIsAppReady] = useState(false)

  const dispatch = dispatchHandler(store.dispatch)

  // initializing App
  useEffect(() => {
    getFonts()
    if (!user) getUser()
    getDB()
    // AsyncStorage.setItem("isFirstLaunch", "false")
    /**
     * async storage for tracking first app run, set it in modal screen which will be shown
     * at first app run, by default theres no key, so value is null. if that is null, then
     * we knw app is running first time.
     */
  }, [])

  const getFonts = async () => {
    await Font.loadAsync(appFonts)
    setFontsLoaded(true)
    printLog("fonts loaded")
  }

  const getDB = () => {
    InitDB(dispatch)
      .then(() => {
        setIsAppReady(true)
      })
      .catch(() => {
        console.log("ERROR:Ridelogg not ready!")
      })
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
            {user ? (
              isAppReady ? (
                <AppNavigation />
              ) : (
                <ActivityIndicator
                  size="large"
                  color={Colors.imperialRed}
                  style={{ alignSelf: "center", justifyContent: "center" }}
                />
              )
            ) : (
              <AuthStack />
            )}
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  ) : (
    <ActivityIndicator size={"large"} />
  )
}
