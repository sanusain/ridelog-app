import React, { FunctionComponent } from "react"
import { Text, View } from "react-native"
import ScreenHeader from "../../Components/Header"
import Colors from "../../Config/Colors"

type Props = {}

const AddRefuelLog: FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScreenHeader title={"New log"} />
      <Text>add a new log</Text>
    </View>
  )
}

export default AddRefuelLog
