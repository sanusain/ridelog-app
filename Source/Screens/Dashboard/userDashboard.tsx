import React, { useContext } from "react"
import { AppState, Text, View } from "react-native"
import { connect } from "react-redux"
import { AuthContext } from "../../Contexts/AuthProvider"
import { dispatchHandler } from "../../State-management"

type Props = {}

const userDashboard: React.FunctionComponent<Props> = (props) => {
  const { user } = useContext(AuthContext)
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
