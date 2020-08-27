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
  const handleSignUp = () => {
    console.log("signup")
  }
  const handleSignInWithGoogle = () => {
    console.log("signinwith google")
  }
  const handleSignInWithFacebook = () => {
    console.log("signinwith facebook")
  }

  return (
    <View
      style={{
        flex: 1,
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
        Sign In - remove later
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "red",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            borderWidth: 1,
            alignSelf: "center",
            justifyContent: "center",
            fontSize: 70,
            color: Colors.imperialRed,
          }}
        >
          Ridelogg
        </Text>
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
            color: Colors.tGrey,
            opacity: 0.67,
            alignSelf: "center",
            marginTop: 15,
          }}
        >
          Don't have an account?
          <Text style={{ color: Colors.imperialRed }} onPress={handleSignUp}>
            {" "}
            Create new account
          </Text>
        </Text>

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
          buttonBackgroundColor={Colors.googleBlue}
          style={{
            alignSelf: "center",
            marginTop: 24,
            borderWidth: 1,
            borderColor: Colors.googleBlue,
          }}
        />
        <SquareButton
          title={"Sign In with Facebook"}
          onPress={handleSignInWithFacebook}
          buttonBackgroundColor={Colors.facebookBlue}
          style={{
            alignSelf: "center",
            marginTop: 24,
            borderWidth: 1,
            borderColor: Colors.googleBlue,
          }}
        />
      </View>
    </View>
  )
}

export default SignIn
