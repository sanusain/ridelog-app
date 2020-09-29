import { createStackNavigator } from "@react-navigation/stack"
import ProfileUpdate from "../Screens/Account/profileUpdate"
import UserAccount from "../Screens/Account/userAccount"
import { AccountsStackParamsList } from "./types"

const AccountsStack = () => {
  const Accounts = createStackNavigator<AccountsStackParamsList>()

  return (
    <Accounts.Navigator>
      <Accounts.Screen name={"account"} component={UserAccount} />
      <Accounts.Screen name={"profileUpdate"} component={ProfileUpdate} />
    </Accounts.Navigator>
  )
}

export default AccountsStack
