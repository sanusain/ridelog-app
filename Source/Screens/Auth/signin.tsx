import React from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import Colors from "../../Config/Colors"

const SignIn = () => {
  const handleForgotPass = () => {
    console.log("forgot password")
  }

  const handleSignIn = () => {
    console.log("signin")
  }
  const handleSignInWithGoogle = () => {
    console.log("signinwith google")
  }

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: "blue",
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.4,
        }}
      >
        Sign In
      </Text>

      <View style={{ marginTop: 138, flex: 1 }}>
        <LightTextInput
          style={{ alignSelf: "center", borderColor: Colors.imperialRed }}
          placeholder={"Email"}
          textContentType={"emailAddress"}
          onChangeText={(text) => {
            console.log(text)
          }}
        />
        <LightTextInput
          style={{
            marginTop: 15,
            alignSelf: "center",
            borderColor: Colors.imperialRed,
          }}
          secureTextEntry
          textContentType={"password"}
          placeholder={"Password"}
          onChangeText={(text) => {
            console.log(text)
          }}
        />

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 15 }}
          onPress={handleForgotPass}
        >
          <Text style={{ color: Colors.tGrey, opacity: 0.67 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <SquareButton
          buttonBackgroundColor={Colors.imperialRed}
          style={{ alignSelf: "center", marginTop: 15 }}
          title={"Sign In"}
          onPress={handleSignIn}
        />
        <Text
          style={{
            alignSelf: "center",
            marginTop: 24,
            color: Colors.tGrey,
            opacity: 0.67,
          }}
        >
          OR
        </Text>

        <SquareButton
          title={"Sign In with Google"}
          onPress={handleSignInWithGoogle}
          buttonBackgroundColor={Colors.white}
          style={{
            alignSelf: "center",
            marginTop: 24,
            borderColor: Colors.googleBlue,
          }}
        />
      </View>
    </View>
  )
}

export default SignIn
