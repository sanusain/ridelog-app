import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import { AppState, dispatchHandler } from "../../State-management"

type Props = {}

const userAccount: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>ACCOUNTS</Text>
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userAccount)
