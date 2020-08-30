import React, { useContext, useState } from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { firebase } from "../../Config/firebase"
import { AuthContext, User } from "../../Contexts/AuthProvider"

type Props = { navigation: any }

const SignUp: React.FunctionComponent<Props> = (props) => {
  const [callSign, setCallSign] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)

  const handleSignInRedirection = () => {
    console.log("redirect to signIn")
    props.navigation.navigate("signIn")
  }

  const handleSignUp = () => {
    if (!callSign || !email || !password) {
      console.log("any value cannot be empty")
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        const newUserData: User = {
          uid: userData.user ? userData.user.uid : "",
          callsign: callSign,
          emailId: email,
          avatar: "", // DR:dont set avatar now, let the user set it in accounts, if they want.
        }

        const usersRef = firebase.firestore().collection("users")
        usersRef
          .doc(userData.user?.uid)
          .set(newUserData)
          .then(() => {
            login(newUserData)
          })
      })
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
            setCallSign(text)
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
          onChangeText={(email) => {
            setEmail(email)
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
          onChangeText={(password) => {
            setPassword(password)
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
