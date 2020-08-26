import React from "react"
import { AppState, Text, View } from "react-native"
import { connect } from "react-redux"
import { dispatchHandler } from "../../State-management"

type Props = {}
const userRefuelLog: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>REFUEL LOG</Text>
    </View>
  )
}
const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userRefuelLog)
