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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "OpenSans-Regular",
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
          fontFamily: "OpenSans-Bold",
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
          fontFamily: "OpenSans-Light",
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
          fontFamily: "OpenSans-SemiBold",
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
          ...props.style,
          fontSize: props.fontSize,
          fontFamily: "OpenSans-SemiBoldItalic",
        }}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    )
}

export default TextOpenSans
