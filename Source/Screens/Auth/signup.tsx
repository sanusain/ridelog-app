import React from "react"
import { View } from "react-native"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"

const SignUp = () => {
  const handleSignInRedirection = () => {
    console.log("redirect to signIn")
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
    </View>
  )
}

export default SignUp
