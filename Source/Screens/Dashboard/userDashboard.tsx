import React from "react"
import { AppState, Text, View } from "react-native"
import { connect } from "react-redux"
import { dispatchHandler } from "../../State-management"

type Props = {}

const userDashboard: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={{ borderWidth: 1, borderColor: "red", flex: 1 }}>
      <Text>DASH BOARD</Text>
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userDashboard)
