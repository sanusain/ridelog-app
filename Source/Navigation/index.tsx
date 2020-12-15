import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import ProfileUpdate from '../Screens/Account/profileUpdate'
import AddVehicle from '../Screens/Dashboard/addVehicle'
import AddRefuelLog from '../Screens/Refuel/addRefuelLog'
import RefuelDetails from '../Screens/Refuel/refuelDetails'
import BottomTabsNavigator from './BottomTabs'

const AppNavigation = (): JSX.Element => {
  const AppStack = createStackNavigator()

  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="bottomTabs" component={BottomTabsNavigator} />
      <AppStack.Screen name="addVehicle" component={AddVehicle} />
      <AppStack.Screen name="profileUpdate" component={ProfileUpdate} />
      <AppStack.Screen name="refuelDetails" component={RefuelDetails} />
      <AppStack.Screen name="addRefuelLog" component={AddRefuelLog} />
    </AppStack.Navigator>
  )
}

export default AppNavigation
