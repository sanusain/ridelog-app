import React, { useContext } from "react"
import { AppState, Image, Text, View } from "react-native"
import { connect } from "react-redux"
import { AuthContext } from "../../Contexts/AuthProvider"
import { dispatchHandler } from "../../State-management"

type Props = { navigation: any }

const userDashboard: React.FunctionComponent<Props> = (props) => {
  const { user, logout } = useContext(AuthContext)

  // useEffect(() => {
  //   console.log("user", user)

  //   firebase.auth().onAuthStateChanged((userLogged) => {
  //     if (!userLogged)
  //       Alert.alert(
  //         "Re Login",
  //         "Youre logged out of cloud, Please relogin",
  //         [
  //           {
  //             text: "Re login",
  //             onPress: () => {
  //               logout()
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       )
  //   })
  // }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <Image source={{ uri: user?.avatar }} style={{ height: 50, width: 50 }} />
      <Text>Welcome, {user?.callSign}</Text>
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userDashboard)
