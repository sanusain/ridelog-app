import {
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import UserAccount from "../Screens/Account/userAccount"
import Dashboard from "../Screens/Dashboard/userDashboard"
import RefuelLog from "../Screens/Refuel/userRefuelLog"
import ServiceLog from "../Screens/Service/userServiceLog"

const BottomTabsNavigator = () => {
  const TabsComponent = createBottomTabNavigator()

  return (
    <TabsComponent.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          switch (route.name) {
            case "dashboard":
              return (
                <MaterialCommunityIcons
                  name="view-dashboard"
                  color={color}
                  size={size}
                />
              )
            case "refuel":
              return (
                <MaterialCommunityIcons name="fuel" color={color} size={size} />
              )
            case "unassigned":
              return focused ? (
                <Entypo name="circle-with-cross" color={color} size={size} />
              ) : (
                <Entypo name="circle" color={color} size={size} />
              )
            case "service":
              return <Entypo name="clipboard" color={color} size={size} />
            case "account":
              return <SimpleLineIcons name="user" color={color} size={size} />

            default:
              return <SimpleLineIcons name="user" color={color} size={size} />
          }
        },
      })}
    >
      <TabsComponent.Screen name={"dashboard"} component={Dashboard} />
      <TabsComponent.Screen name={"refuel"} component={RefuelLog} />
      <TabsComponent.Screen name={"unassigned"} component={Dashboard} />
      <TabsComponent.Screen name={"service"} component={ServiceLog} />
      <TabsComponent.Screen name={"account"} component={UserAccount} />
    </TabsComponent.Navigator>
  )
}

export default BottomTabsNavigator
