import React from 'react'
import {TouchableOpacity} from 'react-native'
import Colors from '../Config/Colors'
import {noop} from '../Util'
import TextMontserrat from './TextMontserrat'

type Props = {
  title: string
  onPress?: () => void
  style?: any
  buttonBackgroundColor?: string
  textColor?: string
  borderRadius?: number
  width?: number | string
  textOpacity?: number
  icon?: () => void
  disabled?: boolean
}

const SquareButton: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        height: 48,
        borderRadius: props.borderRadius ? props.borderRadius : 7,
        paddingHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: props.buttonBackgroundColor
          ? props.buttonBackgroundColor
          : Colors.googleBlue,
        width: props.width ? props.width : '90%',
        opacity: props.disabled ? 0.5 : 1,
        ...props.style,
      }}
      onPress={props.onPress ? props.onPress : noop}
      disabled={props.disabled}>
      <TextMontserrat
        fontSize={16}
        weight="semibold"
        style={{
          alignSelf: 'center',
          color: props.textColor ? props.textColor : Colors.white,
          letterSpacing: 0.8,
        }}>
        {props.title}
      </TextMontserrat>
    </TouchableOpacity>
  )
}

export default SquareButton
