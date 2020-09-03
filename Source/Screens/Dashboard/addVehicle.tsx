import React from "react"
import { Text, View } from "react-native"
import {
  AddVehicleNavigationProp,
  AddVehicleRouteProp,
} from "../../Navigation/types"

type Props = {
  navigation: AddVehicleNavigationProp
  route: AddVehicleRouteProp
}

const AddVehicle: React.FunctionComponent<Props> = (props) => {
  return (
    <View>
      <Text>Add vehicle</Text>
    </View>
  )
}

export default AddVehicle
