import * as Google from "expo-google-app-auth"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { firebase } from "../../Config/firebase"
import { AuthContext, User } from "../../Contexts/AuthProvider"

type Props = { navigation: any }

const SignIn: React.FunctionComponent<Props> = (props) => {
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [loginSpinner, setloginSpinner] = useState(false)
  const { user, login } = useContext(AuthContext)

  useEffect(() => {
    return () => {
      setloginSpinner(false)
    }
  }, [])

  const handleForgotPass = () => {
    console.log("forgot password")
  }

  const handleSignIn = () => {
    if (!inputEmail || !inputPassword) {
      Alert.alert("Error", "Required fields are missing", [{ text: "ok" }], {
        cancelable: true,
      })
      return
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then((userData) => {
        const signInUserData: User = {
          uid: userData.user ? userData.user.uid : "",
          callSign: userData.user
            ? userData.user.displayName
              ? userData.user.displayName
              : ""
            : "",
          emailId: inputEmail,
          avatar: "",
        }
        login(signInUserData)
      })
      .catch((error) => {
        Alert.alert(
          "Login",
          "Invalid pass or social login enabled",
          [
            {
              text: "OK",
            },
          ],
          { cancelable: true }
        )
      })

    console.log("signin")
  }
  const handleSignUpRedirection = () => {
    console.log("signup")
    props.navigation.navigate("signUp")
  }
  const handleSignInWithGoogleAsync = async () => {
    setloginSpinner(true)
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "931489511293-l561q0pdj13eppsqavsehc3e3tm8pje8.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      })

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        )
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((firebaseAuthUser) => {
            const logUser: User = {
              uid: firebaseAuthUser.user?.uid ? firebaseAuthUser.user?.uid : "",
              avatar: result.user.photoUrl,
              callSign: result.user.givenName ? result.user.givenName : "",
              emailId: result.user.email ? result.user.email : "",
            }

            login(logUser)
          })
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }
  const handleSignInWithFacebook = () => {
    console.log("signinwith facebook")
  }
  if (!user && loginSpinner) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size={"large"}
          style={{ borderColor: Colors.imperialRed }}
        />
      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
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
          weight={"bold"}
          fontSize={60}
        >
          R
        </TextMontserrat>
        <LightTextInput
          style={{ alignSelf: "center", borderColor: Colors.imperialRed }}
          placeholder={"Email"}
          textContentType={"emailAddress"}
          keyboardType={"email-address"}
          onChangeText={(email) => {
            setInputEmail(email)
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
          onChangeText={(password) => {
            setInputPassword(password)
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
          onPress={handleSignInWithGoogleAsync}
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
