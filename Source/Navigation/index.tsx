import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import ProfileUpdate from '../Screens/Account/profileUpdate'
import AddVehicle from '../Screens/Dashboard/addVehicle'
import AddRefuelLog from '../Screens/Refuel/addRefuelLog'
import RefuelDetails from '../Screens/Refuel/refuelDetails'
import AddServiceLog from '../Screens/Service/addServiceLog'
import ServiceDetails from '../Screens/Service/serviceDetails'
import BottomTabsNavigator from './BottomTabs'

const AppNavigation = (): JSX.Element => {
  const AppStack = createStackNavigator()

  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="bottomTabs" component={BottomTabsNavigator} />
      <AppStack.Screen name="addVehicle" component={AddVehicle} />
      <AppStack.Screen name="profileUpdate" component={ProfileUpdate} />
      <AppStack.Screen name="refuelDetails" component={RefuelDetails} />
      <AppStack.Screen name="serviceDetails" component={ServiceDetails} />
      <AppStack.Screen name="addRefuelLog" component={AddRefuelLog} />
      <AppStack.Screen name="addServiceLog" component={AddServiceLog} />
    </AppStack.Navigator>
  )
}

export default AppNavigation
