import AsyncStorage from '@react-native-async-storage/async-storage'
import {NavigationContainer} from '@react-navigation/native'
import React, {useContext, useEffect} from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'
import SafeAreaView from '../Components/SafeAreaView'
import {AuthContext} from '../Contexts/AuthProvider'
import {getRealmInstance} from '../Database'
import AppNavigation from '../Navigation'
import AuthStack from '../Navigation/AuthStack'
import {dispatchHandler, getStore} from '../State-management'
import {
  hydrateVehicleState,
  uploadTrackerListener,
} from '../State-management/hydration'

const store = getStore()
const realm = getRealmInstance()

export const dispatch: any = dispatchHandler(store.dispatch)

export default function Providers(): JSX.Element {
  const {user, login} = useContext(AuthContext)

  // initializing App
  useEffect(() => {
    if (user) {
      hydrateVehicleState()
      // @ts-ignore
      const {uploadTracker} = realm.objects('User')[0]
      uploadTracker.removeAllListeners()
      uploadTracker.addListener(uploadTrackerListener)
    } else getUser()
    SplashScreen.hide()
  }, [user])

  const getUser = () => {
    AsyncStorage.getItem('user')
      .then((data) => {
        if (data) login(JSON.parse(data))
      })
      .catch((error) => console.log('couldnt log user in', error))
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaView>
            {user ? <AppNavigation /> : <AuthStack />}
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  )
}
