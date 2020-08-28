import React from "react"
import { Text } from "react-native"

type Props = {
  fontSize: number
  style?: any
  type?: "light" | "regular" | "bold" | "semibold" | "semibolditalic"
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
      >
        {props.children}
      </Text>
    )
}

export default TextOpenSans
