import React from "react"
import { Text, TouchableOpacity } from "react-native"
import Colors from "../Config/Colors"

type Props = {
  title: string
  onPress: () => void
  style?: any
  buttonBackgroundColor?: string
  textColor?: string
  borderRadius?: number
  width?: number
  textOpacity?: number
  icon?: () => void
}

const SquareButton: React.FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...props.style,
        height: 48,
        borderRadius: props.borderRadius ? props.borderRadius : 7,
        paddingHorizontal: 30,
        justifyContent: "center",
        backgroundColor: props.buttonBackgroundColor
          ? props.buttonBackgroundColor
          : Colors.lightGreen,
        width: props.width ? props.width : "90%",
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 16,
          color: props.textColor ? props.textColor : Colors.white,
          letterSpacing: 0.8,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default SquareButton
