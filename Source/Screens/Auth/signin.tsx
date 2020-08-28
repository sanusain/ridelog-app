import React from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"

type Props = { navigation: any }

const SignIn: React.FunctionComponent<Props> = (props) => {
  const handleForgotPass = () => {
    console.log("forgot password")
  }

  const handleSignIn = () => {
    console.log("signin")
  }
  const handleSignUpRedirection = () => {
    console.log("signup")
    props.navigation.navigate("signUp")
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
        backgroundColor: Colors.white,
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
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TextMontserrat
          style={{
            alignSelf: "center",
            justifyContent: "center",
            color: Colors.imperialRed,
          }}
          type={"bold"}
          fontSize={60}
        >
          R
        </TextMontserrat>
        <LightTextInput
          style={{ alignSelf: "center", borderColor: Colors.imperialRed }}
          placeholder={"Email"}
          textContentType={"emailAddress"}
          keyboardType={"email-address"}
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
          <TextOpenSans
            fontSize={16}
            style={{ color: Colors.tGrey, opacity: 0.67 }}
          >
            Forgot Password?
          </TextOpenSans>
        </TouchableOpacity>

        <SquareButton
          buttonBackgroundColor={Colors.imperialRed}
          style={{ alignSelf: "center", marginTop: 15 }}
          title={"Sign In"}
          onPress={handleSignIn}
        />

        <TextOpenSans
          fontSize={16}
          style={{
            color: Colors.tGrey,
            opacity: 0.67,
            alignSelf: "center",
            marginTop: 15,
          }}
        >
          Don't have an account?
          <TextOpenSans
            fontSize={16}
            style={{ color: Colors.imperialRed }}
            onPress={handleSignUpRedirection}
          >
            {" "}
            Create new account
          </TextOpenSans>
        </TextOpenSans>

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
