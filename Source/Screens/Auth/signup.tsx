import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"

type Props = { navigation: any }

const SignUp: React.FunctionComponent<Props> = (props) => {
  const handleSignInRedirection = () => {
    console.log("redirect to signIn")
    props.navigation.navigate("signIn")
  }

  const handleSignUp = () => {
    console.log("handle signup")
  }
  const handleSignUpWithGoogle = () => {
    console.log("handle signup with google")
  }
  const handleSignUpWithFacebook = () => {
    console.log("handle signup with facebook")
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: Colors.white,
        }}
      >
        <TextMontserrat type={"semibold"} fontSize={30}>
          Create Account
        </TextMontserrat>
        <TextOpenSans
          fontSize={16}
          style={{ marginTop: 10, textAlign: "left" }}
        >
          Enter your Name, Email and Password for sign up.
          <TextOpenSans
            fontSize={16}
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
          buttonBackgroundColor={Colors.imperialRed}
          style={{ width: "100%", marginTop: 20 }}
          onPress={handleSignUp}
        />

        <TextMontserrat
          fontSize={16}
          style={{
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          {" "}
          OR
        </TextMontserrat>

        <SquareButton
          title={"CONNECT WITH GOOGLE"}
          onPress={handleSignUpWithGoogle}
          style={{ width: "100%" }}
        />
        <SquareButton
          title={"CONNECT WITH FACEBOOK"}
          onPress={handleSignUpWithFacebook}
          buttonBackgroundColor={Colors.facebookBlue}
          style={{ marginTop: 20, width: "100%" }}
        />
        <TextMontserrat
          fontSize={12}
          style={{
            textAlign: "center",
            marginVertical: 10,
            color: Colors.tGrey,
            opacity: 0.67,
          }}
        >
          By Signing up you agree to our Terms Conditions & Privacy Policy.
        </TextMontserrat>
      </ScrollView>
    </View>
  )
}

export default SignUp
