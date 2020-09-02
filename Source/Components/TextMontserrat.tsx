import React from "react"
import { Text } from "react-native"

type Props = {
  fontSize: number
  style?: any
  type?: "light" | "regular" | "bold" | "medium" | "semibold" | "italic"
  onPress?: () => any
}

//@ts-ignore
const TextMontserrat: React.FunctionComponent<Props> = (props) => {
  if (!props.type)
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

  if (props.type === "bold")
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
  if (props.type === "medium")
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
  if (props.type === "light")
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
  if (props.type === "semibold")
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
