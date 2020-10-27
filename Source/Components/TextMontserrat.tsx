import React from "react"
import { Text } from "react-native"
import Colors from "../Config/Colors"

type Props = {
  fontSize: number
  fontColor?: string
  style?: any
  weight?: "light" | "regular" | "bold" | "medium" | "semibold" | "italic"
  onPress?: () => any
}

//@ts-ignore
const TextMontserrat: React.FunctionComponent<Props> = (props) => {
  if (!props.weight)
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Regular",
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )

  if (props.weight === "bold")
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Bold",
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
  if (props.weight === "medium")
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Medium",
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
  if (props.weight === "light")
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Light",
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
  if (props.weight === "semibold")
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "Montserrat-SemiBold",
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
}

export default TextMontserrat
