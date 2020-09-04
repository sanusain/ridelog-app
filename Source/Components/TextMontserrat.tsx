import React from "react"
import { Text } from "react-native"

type Props = {
  fontSize: number
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
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
}

export default TextMontserrat
