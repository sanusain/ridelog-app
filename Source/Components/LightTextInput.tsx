import React from "react"
import { TextInput } from "react-native-gesture-handler"
import Colors from "../Config/Colors"

type Props = {
  placeholder: string
  onChangeText: (input: string) => void
  style?: any
  textContentType:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "password"
    | undefined
  secureTextEntry?: boolean
}

const LightTextInput: React.FunctionComponent<Props> = (props) => {
  return (
    <TextInput
      textContentType={props.textContentType}
      secureTextEntry={props.secureTextEntry}
      style={{
        borderWidth: 1, // remove later
        width: "90%",
        height: 54,
        borderRadius: 6,
        paddingHorizontal: 16,
        fontSize: 18,
        flexDirection: "column",
        backgroundColor: Colors.inputBackGroundWhite,
        ...props.style,
      }}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
    />
  )
}

export default LightTextInput
