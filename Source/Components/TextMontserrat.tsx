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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Regular",
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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Bold",
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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Medium",
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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "Montserrat-Light",
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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "Montserrat-SemiBold",
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
}

export default TextMontserrat
