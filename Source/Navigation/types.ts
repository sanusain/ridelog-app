import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type BottomTabsParamList = {
  dashboard: undefined
  refuel: undefined
  unassigned: undefined
  service: undefined
  account: undefined
}

type DashboardStackParamsList = {
  dashboard: undefined
  addVehicle: undefined
}
//################## NAVIGATION PROPS ###################

export type DashboardNavigationProp = StackNavigationProp<
  DashboardStackParamsList,
  "dashboard"
>
export type AddVehicleNavigationProp = StackNavigationProp<
  DashboardStackParamsList,
  "addVehicle"
>

//################## ROUTE PROPS ###################

export type DashboardRouteProp = RouteProp<
  DashboardStackParamsList,
  "dashboard"
>
export type AddVehicleRouteProp = RouteProp<
  DashboardStackParamsList,
  "addVehicle"
>
