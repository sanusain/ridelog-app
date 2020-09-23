import React from "react"
import { Text } from "react-native"

type Props = {
  fontSize: number
  style?: any
  weight?: "light" | "regular" | "bold" | "semibold" | "semibolditalic"
  onPress?: () => any
}

//@ts-ignore
const TextOpenSans: React.FunctionComponent<Props> = (props) => {
  if (!props.weight)
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

  if (props.weight === "bold")
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
  if (props.weight === "light")
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
  if (props.weight === "semibold")
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
  if (props.weight === "semibolditalic")
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
