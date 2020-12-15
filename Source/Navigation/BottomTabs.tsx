// eslint-disable-next-line import/no-extraneous-dependencies
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import TextMontserrat from '../Components/TextMontserrat'
import Colors from '../Config/Colors'
import Accounts from '../Screens/Account/userAccount'
import DashBoard from '../Screens/Dashboard/dashboard'
import RefuelLog from '../Screens/Refuel/refuel'
import ServiceLog from '../Screens/Service/userServiceLog'
import {BottomTabsParamList} from './types'

const BottomTabsNavigator = (): JSX.Element => {
  const TabsComponent = createMaterialTopTabNavigator<BottomTabsParamList>()

  return (
    <TabsComponent.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        labelStyle: {fontSize: 8},
        indicatorStyle: {backgroundColor: Colors.default_red},
        activeTintColor: Colors.default_red,
      }}
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/display-name
        tabBarLabel: ({focused}) => {
          let tabName
          switch (route.name) {
            case 'dashboard':
              tabName = 'Dash'
              break
            case 'refuel':
              tabName = 'Fuel'
              break
            case 'unassigned':
              tabName = 'Unass'
              break
            case 'service':
              tabName = 'Service'
              break
            case 'account':
              tabName = 'User'
              break
            default:
              tabName = 'Null'
          }

          return (
            <TextMontserrat
              fontSize={13}
              style={{
                color: focused ? Colors.default_red : Colors.default_grey,
              }}>
              {tabName}
            </TextMontserrat>
          )
        },

        // eslint-disable-next-line react/display-name
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'dashboard':
              return (
                <AntDesign
                  name="dashboard"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case 'refuel':
              return (
                <SimpleLineIcons
                  name="drop"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case 'unassigned':
              return (
                <Entypo
                  name="circle-with-cross"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case 'service':
              return (
                <Feather
                  name="clipboard"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case 'account':
              return (
                <SimpleLineIcons
                  name="user"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )

            default:
              return (
                <SimpleLineIcons
                  name="user"
                  color={focused ? Colors.default_red : Colors.default_grey}
                />
              )
          }
        },
      })}>
      <TabsComponent.Screen name="dashboard" component={DashBoard} />
      <TabsComponent.Screen name="refuel" component={RefuelLog} />
      <TabsComponent.Screen name="unassigned" component={DashBoard} />
      <TabsComponent.Screen name="service" component={ServiceLog} />
      <TabsComponent.Screen name="account" component={Accounts} />
    </TabsComponent.Navigator>
  )
}

export default BottomTabsNavigator
