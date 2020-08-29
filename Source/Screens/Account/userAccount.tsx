import React, { useContext } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import SquareButton from "../../Components/SquareButton"
import { AuthContext } from "../../Contexts/AuthProvider"
import { AppState, dispatchHandler } from "../../State-management"

type Props = {}

const userAccount: React.FunctionComponent<Props> = (props) => {
  const Auth = useContext(AuthContext)

  const handleLogout = () => {
    Auth.logout()
    console.log("user logged out")
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
