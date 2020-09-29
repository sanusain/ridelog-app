import { createStackNavigator } from "@react-navigation/stack"
import React, { FunctionComponent } from "react"
import AddVehicle from "../Screens/Dashboard/addVehicle"
import userDashboard from "../Screens/Dashboard/userDashboard"
import {
  DashboardNavigationProp,
  DashboardRouteProp,
  DashboardStackParamsList,
} from "./types"

type Props = {
  navigation: DashboardNavigationProp
  route: DashboardRouteProp
}

const DashBoardStack: FunctionComponent<Props> = (props) => {
  const Dashboard = createStackNavigator<DashboardStackParamsList>()
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
