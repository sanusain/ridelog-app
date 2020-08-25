import React from "react"
import { TextInput, View } from "react-native"
import Colors from "../Config/Colors"

type inputType =
  | "password"
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
  | undefined

type Props = {
  placeholder: string
  inputType?: inputType
  style?: any
  onChangeText: (text: string) => void
}

const TextInputField: React.FunctionComponent<Props> = (props) => {
  return (
    <View
      style={{
        ...props.style,
        backgroundColor: Colors.Transparent_White,
        width: "90%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        style={{
          flex: 1,
          width: "100%",
          alignSelf: "center",
          fontSize: 20,
          textAlign: "center",
        }}
        secureTextEntry={props.inputType === "password" ? true : false}
        textContentType={props.inputType}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.black}
        onChangeText={(input) => {
          props.onChangeText(input)
        }}
      />
    </View>
  )
}

export default TextInputField
