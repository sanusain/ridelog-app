import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import AddVehicle from "../Screens/Dashboard/addVehicle"
import userDashboard from "../Screens/Dashboard/userDashboard"
import { DashboardNavigationProp, DashboardRouteProp } from "./types"

const DashBoardStack = ({
  navigation,
  route,
}: {
  navigation: DashboardNavigationProp
  route: DashboardRouteProp
}) => {
  const Dashboard = createStackNavigator()
  return (
    <Dashboard.Navigator screenOptions={{ headerShown: false }}>
      <Dashboard.Screen name="dashboard" component={userDashboard} />
      <Dashboard.Screen
        name="addVehicle"
        component={AddVehicle}
        options={{
          headerShown: true,
          headerTitle: "Add new vehicle",
        }}
      />
    </Dashboard.Navigator>
  )
}

export default DashBoardStack
