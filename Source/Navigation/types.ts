import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

/**
 * USAGE
 * define type paramlist : this is the root stack of the particular
 * branch, which contains the main screen, along with all the sub-screens.
 *
 * add this to the type for createXNavigator (X = stack, bottomtab,drawer)
 * eg:   const Dashboard = createStackNavigator<DashboardStackParamsList>()

 * define type navigationProp :Each route(screen) has its own navigation
 * prop type,stackXprops takes only 2 args, add the rootstack as the first param,
 * and then the routename. The routename must be in the rootstack.
 *
 * defining route props : Similar to navigationProp, RouteProps takes 2 args, rootstack
 * and routename
 *
 * The navigation and route props are given to the screen, they can be either destructured
 * and annotated, or defined as props then annotated, in either case, they need to be annotated
 * with their respective screen navigation and route prop type.
 */

//################## PARAMS LIST ###################

export type AppStackParamsList = {
  dashboard: undefined
  refuel: undefined
  unassigned: undefined
  service: undefined
  account: undefined
  addVehicle: undefined
  profileUpdate: undefined
  updatePassword: undefined
}

//################## NAVIGATION PROPS ###################

// MAIN SCREENS
export type DashboardNavigationProp = StackNavigationProp<
  AppStackParamsList,
  "dashboard"
>
export type AccountsNavigationProps = StackNavigationProp<
  AppStackParamsList,
  "account"
>

// SUB SCREENS
export type AddVehicleNavigationProp = StackNavigationProp<
  AppStackParamsList,
  "addVehicle"
>

export type ProfileUpdateNavigationProps = StackNavigationProp<
  AppStackParamsList,
  "profileUpdate"
>

export type updatePasswordNavigationProps = StackNavigationProp<
  AppStackParamsList,
  "updatePassword"
>

//################## ROUTE PROPS ###################
// MAIN SCREENS
export type DashboardRouteProp = RouteProp<AppStackParamsList, "dashboard">
export type AccountsRouteProp = RouteProp<AppStackParamsList, "account">

// SUB SCREENS
export type AddVehicleRouteProp = RouteProp<AppStackParamsList, "addVehicle">

export type ProfileUpdateRouteProp = RouteProp<
  AppStackParamsList,
  "profileUpdate"
>
