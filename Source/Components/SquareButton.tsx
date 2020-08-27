import React from "react"
import { Text, TouchableOpacity } from "react-native"
import Colors from "../Config/Colors"

type Props = {
  title: string
  onPress: () => void
  style?: any
  buttonBackgroundColor?: string
  textColor?: string
  paddingVertical?: number
  paddingHorizontal?: number
  borderRadius?: number
}

const SquareButton: React.FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: props.borderRadius ? props.borderRadius : 5,
        paddingHorizontal: props.paddingHorizontal
          ? props.paddingHorizontal
          : 30,
        paddingVertical: props.paddingVertical ? props.paddingVertical : 10,
        backgroundColor: props.buttonBackgroundColor
          ? props.buttonBackgroundColor
          : Colors.lightGreen,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          fontSize: 14,
          color: props.textColor ? props.textColor : Colors.white,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default SquareButton
