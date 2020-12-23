import AsyncStorage from '@react-native-async-storage/async-storage'
import {NavigationContainer} from '@react-navigation/native'
import React, {useContext, useEffect} from 'react'
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper'
import {Provider} from 'react-redux'
import SafeAreaView from '../Components/SafeAreaView'
import Colors from '../Config/Colors'
import {AuthContext} from '../Contexts/AuthProvider'
import AppNavigation from '../Navigation'
import AuthStack from '../Navigation/AuthStack'
import {dispatchHandler, getStore} from '../State-management'
import {hydrateVehicleState} from '../State-management/hydration'

const store = getStore()
export const dispatch: any = dispatchHandler(store.dispatch)

export default function Providers(): JSX.Element {
  // const [fontsLoaded, setFontsLoaded] = useState(false)
  const {user, login} = useContext(AuthContext)

  async function hydrateState() {
    await hydrateVehicleState()
    // await hydrateRefuelLogState()
  }
  // initializing App
  useEffect(() => {
    if (user) hydrateState()
    // getFonts()
    if (!user) getUser()
    // getDB()
    // AsyncStorage.setItem("isFirstLaunch", "false")
    /**
     * async storage for tracking first app run, set it in modal screen which will be shown
     * at first app run, by default theres no key, so value is null. if that is null, then
     * we knw app is running first time.
     */
  }, [user])

  const getUser = async () => {
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
            {user ? (
              true ? ( // app ready check
                <AppNavigation />
              ) : (
                <ActivityIndicator
                  size="large"
                  color={Colors.imperialRed}
                  style={{alignSelf: 'center', justifyContent: 'center'}}
                />
              )
            ) : (
              <AuthStack />
            )}
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  )
}
