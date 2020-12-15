import React from 'react'
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import Colors from '../Config/Colors'

type Props = {
  placeholder: string
  onChangeText: (input: string) => void
  style?: any
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  textContentType:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'password'
    | undefined
  secureTextEntry?: boolean
  keyboardType?:
    | 'email-address'
    | 'default'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
}

const LightTextInput: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <TextInput
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      textContentType={props.textContentType}
      secureTextEntry={props.secureTextEntry}
      onBlur={props.onBlur}
      style={{
        borderBottomWidth: 1, // experimental
        borderColor: Colors.imperialRed, // experimental
        width: '90%',
        height: 54,
        borderRadius: 6,
        paddingHorizontal: 16,
        fontSize: 18,
        flexDirection: 'column',
        backgroundColor: Colors.inputBackGroundWhite,
        ...props.style,
      }}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
    />
  )
}

export default LightTextInput
