import React, { FunctionComponent } from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import ScreenHeader from "../../Components/Header"
import Colors from "../../Config/Colors"
import { RefuelDetailsNavigationProps } from "../../Navigation/types"
import { AppState, dispatchHandler } from "../../State-management"
import { RefuelData } from "../Dashboard/types"

type Props = {
  refuelData: RefuelData
  navigation: RefuelDetailsNavigationProps
}

const RefuelDetails: FunctionComponent<Props> = (props) => {
  console.log("refueldata", props.refuelData)

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScreenHeader title={"Refuel Details"} />
      <Text>refuel details</Text>
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({
  refuelData: state.refuelData,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(RefuelDetails)
