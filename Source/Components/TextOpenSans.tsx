import React from "react"
import { Text } from "react-native"

type Props = {
  fontSize: number
  style?: any
  type?: "light" | "regular" | "bold" | "semibold" | "semibolditalic"
  onPress?: () => any
}

//@ts-ignore
const TextOpenSans: React.FunctionComponent<Props> = (props) => {
  if (!props.type)
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "OpenSans-Regular",
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
          fontFamily: "OpenSans-Bold",
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
          fontFamily: "OpenSans-Light",
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
          fontFamily: "OpenSans-SemiBold",
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
  if (props.type === "semibolditalic")
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: "OpenSans-SemiBoldItalic",
          ...props.style,
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
}

export default TextOpenSans
