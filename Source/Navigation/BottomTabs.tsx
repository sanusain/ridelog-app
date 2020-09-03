import { AntDesign, Entypo, Feather, SimpleLineIcons } from "@expo/vector-icons"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"
import TextMontserrat from "../Components/TextMontserrat"
import Colors from "../Config/Colors"
import UserAccount from "../Screens/Account/userAccount"
import Dashboard from "../Screens/Dashboard/userDashboard"
import RefuelLog from "../Screens/Refuel/userRefuelLog"
import ServiceLog from "../Screens/Service/userServiceLog"

const BottomTabsNavigator = () => {
  const TabsComponent = createMaterialTopTabNavigator()

  return (
    <TabsComponent.Navigator
      tabBarPosition={"bottom"}
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        labelStyle: { fontSize: 8 },
        indicatorStyle: { backgroundColor: Colors.default_red },
        activeTintColor: Colors.default_red,
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          switch (route.name) {
            case "dashboard":
              return (
                <TextMontserrat
                  fontSize={15}
                  style={{
                    color: focused ? Colors.default_red : Colors.default_grey,
                  }}
                >
                  Dash
                </TextMontserrat>
              )
            case "refuel":
              return (
                <TextMontserrat
                  fontSize={15}
                  style={{
                    color: focused ? Colors.default_red : Colors.default_grey,
                  }}
                >
                  Fuel
                </TextMontserrat>
              )
            case "unassigned":
              return (
                <TextMontserrat
                  fontSize={15}
                  style={{
                    color: focused ? Colors.default_red : Colors.default_grey,
                  }}
                >
                  Unass
                </TextMontserrat>
              )
            case "service":
              return (
                <TextMontserrat
                  fontSize={15}
                  style={{
                    color: focused ? Colors.default_red : Colors.default_grey,
                  }}
                >
                  Service
                </TextMontserrat>
              )
            case "account":
              return (
                <TextMontserrat
                  fontSize={15}
                  style={{
                    color: focused ? Colors.default_red : Colors.default_grey,
                  }}
                >
                  User
                </TextMontserrat>
              )

            default:
              return <TextMontserrat fontSize={15}> null</TextMontserrat>
          }
        },

        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "dashboard":
              return (
                <AntDesign
                  name="dashboard"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case "refuel":
              return (
                <SimpleLineIcons
                  name="drop"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case "unassigned":
              return (
                <Entypo
                  name="circle-with-cross"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case "service":
              return (
                <Feather
                  name="clipboard"
                  color={focused ? Colors.default_red : Colors.default_grey}
                  size={22}
                />
              )
            case "account":
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
                  //   size={size}
                />
              )
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
