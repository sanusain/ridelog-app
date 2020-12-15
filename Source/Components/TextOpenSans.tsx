import React from 'react'
import {Text} from 'react-native'
import Colors from '../Config/Colors'

type Props = {
  fontSize: number
  fontColor?: string
  style?: any
  weight?: 'light' | 'regular' | 'bold' | 'semibold' | 'semibolditalic'
  onPress?: () => any
}

// @ts-ignore
const TextOpenSans: React.FunctionComponent<Props> = (props) => {
  if (!props.weight)
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: 'OpenSans-Regular',
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}>
        {props.children}
      </Text>
    )

  if (props.weight === 'bold')
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: 'OpenSans-Bold',
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}>
        {props.children}
      </Text>
    )
  if (props.weight === 'light')
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: 'OpenSans-Light',
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}>
        {props.children}
      </Text>
    )
  if (props.weight === 'semibold')
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: 'OpenSans-SemiBold',
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}>
        {props.children}
      </Text>
    )
  if (props.weight === 'semibolditalic')
    return (
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: 'OpenSans-SemiBoldItalic',
          color: props.fontColor ? props.fontColor : Colors.black,
          ...props.style,
        }}
        onPress={props.onPress}>
        {props.children}
      </Text>
    )
}

export default TextOpenSans
