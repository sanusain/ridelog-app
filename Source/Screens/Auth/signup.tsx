import React from "react"
import { View } from "react-native"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"

const SignUp = () => {
  const handleSignInRedirection = () => {
    console.log("redirect to signIn")
  }

  const handleSignUp = () => {
    console.log("handle signup")
  }

  return (
    <View
      style={{ borderWidth: 1, flex: 1, marginHorizontal: 20, marginTop: 20 }}
    >
      <TextMontserrat type={"semibold"} fontSize={30}>
        Create Account
      </TextMontserrat>
      <TextOpenSans fontSize={20} style={{ marginTop: 10 }}>
        Enter your Name, Email and Password for sign up.
        <TextOpenSans
          fontSize={20}
          style={{ color: Colors.imperialRed }}
          onPress={handleSignInRedirection}
        >
          {" "}
          Already have account?
        </TextOpenSans>
      </TextOpenSans>

      <LightTextInput
        placeholder={"Call Sign"}
        textContentType={"givenName"}
        style={{
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 20,
          width: "100%",
        }}
        onChangeText={(text) => {
          console.log(text)
        }}
      />
      <LightTextInput
        placeholder={"Email Address"}
        textContentType={"emailAddress"}
        style={{
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 20,
          width: "100%",
        }}
        onChangeText={(text) => {
          console.log(text)
        }}
      />
      <LightTextInput
        placeholder={"Password"}
        textContentType={"password"}
        style={{
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 20,
          width: "100%",
        }}
        onChangeText={(text) => {
          console.log(text)
        }}
      />
      <LightTextInput
        placeholder={"Confirm Password"}
        textContentType={"password"}
        style={{
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 20,
          width: "100%",
        }}
        onChangeText={(text) => {
          console.log(text)
        }}
      />

      <SquareButton
        title={"SIGN UP"}
        style={{ width: "100%", marginTop: 20 }}
        onPress={handleSignUp}
      />
    </View>
  )
}

export default SignUp
