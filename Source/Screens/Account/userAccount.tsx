import React, { useContext } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import SquareButton from "../../Components/SquareButton"
import { firebase } from "../../Config/firebase"
import { AuthContext } from "../../Contexts/AuthProvider"
import { AppState, dispatchHandler } from "../../State-management"

type Props = {}

const userAccount: React.FunctionComponent<Props> = (props) => {
  const { user, logout } = useContext(AuthContext)

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logout()
      })
    console.log("user logged out")
    console.log("user", user)
  }

  return (
    <View style={{ flex: 1 }}>
      <SquareButton title={"LOGOUT"} onPress={handleLogout} />
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userAccount)
