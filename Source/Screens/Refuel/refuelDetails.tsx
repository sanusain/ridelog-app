import React, { FunctionComponent } from "react"
import { Text, View } from "react-native"
import ScreenHeader from "../../Components/Header"
import Colors from "../../Config/Colors"
import { RefuelDetailsNavigationProps } from "../../Navigation/types"

type Props = {
  navigation: RefuelDetailsNavigationProps
}

const RefuelDetails: FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScreenHeader title={"Refuel Details"} />
      <Text>refuel details</Text>
    </View>
  )
}

export default RefuelDetails
