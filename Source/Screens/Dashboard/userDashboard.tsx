import firebase from "firebase"
import React, { useContext, useEffect } from "react"
import { Alert, AppState, Text, View } from "react-native"
import { connect } from "react-redux"
import { AuthContext } from "../../Contexts/AuthProvider"
import { dispatchHandler } from "../../State-management"

type Props = { naviation: any }

const userDashboard: React.FunctionComponent<Props> = (props) => {
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userLogged) => {
      if (!userLogged)
        Alert.alert(
          "Re Login",
          "Youre logged out of cloud, Please relogin",
          [
            {
              text: "Login",
              onPress: () => {
                props.naviation.navigate("signIn")
                console.log("loginscreen")
              },
            },
            {
              text: "Exit",
              onPress: () => {
                logout()
              },
            },
          ],
          { cancelable: false }
        )
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome, {user?.callsign}</Text>
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userDashboard)
