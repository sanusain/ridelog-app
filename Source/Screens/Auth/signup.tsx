import ObjectID from 'bson-objectid'
import React, {useContext, useState} from 'react'
import {Alert, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import LightTextInput from '../../Components/LightTextInput'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import TextOpenSans from '../../Components/TextOpenSans'
import Colors from '../../Config/Colors'
import {AuthContext, User} from '../../Contexts/AuthProvider'
import {signupUserToDbAndCloud} from './jobs'

type Props = {navigation: any}

const SignUp: React.FunctionComponent<Props> = (props: Props) => {
  const [callSign, setCallSign] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useContext(AuthContext)

  const handleSignInRedirection = () => {
    console.log('redirect to signIn')
    props.navigation.navigate('signIn')
  }

  const handleSignUp = async () => {
    if (!callSign || !email || !password) {
      return Alert.alert(
        'Error',
        'Required fields are missing',
        [{text: 'ok'}],
        {
          cancelable: true,
        },
      )
    }
    const newUser: User = {
      _id: new ObjectID().str,
      callsign: callSign,
      email,
      password,
    }
    // apiSignUpUser(newUser)
    //   .then((data) => {
    //     let user: User = {
    //       callsign: newUser.callsign,
    //       email: newUser.email,
    //       authToken: data.token,
    //     }
    //     console.log(user)

    //     login(user)
    //   })
    //   .catch((error) => {
    //     Alert.alert('signup failed', error, [{text: 'Ok'}], {cancelable: true})
    //   })
    const _id = await signupUserToDbAndCloud(newUser, login)
    console.log('###########################_id', _id)
    if (_id) return console.log('login sucessful')
    return console.log('login failed')
  }

  const handleSignInWithGoogleAsync = async () => {
    // set infrastructure so that automatically test or prod client id is set, here
    // only need to mention the androidclient ID
    // try {
    // 	const result = await Google.logInAsync({
    // 		androidClientId: getOAuthClientId(),
    // 		scopes: ['profile', 'email'],
    // 	})
    // 	if (result.type === 'success') {
    // 		onSignIn(result)
    // 		return
    // 	} else {
    // 		return {cancelled: true}
    // 	}
    // } catch (e) {
    // 	return {error: true}
    // }
  }

  const handleSignUpWithFacebook = () => {
    console.log('handle signup with facebook')
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: Colors.white,
        }}>
        <TextMontserrat weight="semibold" fontSize={30}>
          Create Account
        </TextMontserrat>
        <TextOpenSans fontSize={16} style={{marginTop: 10, textAlign: 'left'}}>
          Enter your Name, Email and Password for sign up.
          <TextOpenSans
            fontSize={16}
            style={{color: Colors.imperialRed}}
            onPress={handleSignInRedirection}>
            {' '}
            Already have account?
          </TextOpenSans>
        </TextOpenSans>

        <LightTextInput
          placeholder="Call Sign"
          textContentType="givenName"
          style={{
            alignSelf: 'center',
            marginTop: 20,
            width: '100%',
          }}
          onChangeText={(text) => {
            setCallSign(text)
          }}
        />
        <LightTextInput
          placeholder="Email Address"
          textContentType="emailAddress"
          style={{
            alignSelf: 'center',
            marginTop: 20,
            width: '100%',
          }}
          onChangeText={(mail) => {
            setEmail(mail)
          }}
        />
        <LightTextInput
          placeholder="Password"
          textContentType="password"
          style={{
            alignSelf: 'center',
            marginTop: 20,
            width: '100%',
          }}
          onChangeText={(pass) => {
            setPassword(pass)
          }}
        />
        <SquareButton
          title="SIGN UP"
          buttonBackgroundColor={Colors.imperialRed}
          style={{width: '100%', marginTop: 20}}
          onPress={handleSignUp}
        />
        <TextMontserrat
          fontSize={16}
          style={{
            textAlign: 'center',
            marginVertical: 20,
          }}>
          {' '}
          OR
        </TextMontserrat>

        <SquareButton
          title="CONNECT WITH GOOGLE"
          onPress={handleSignInWithGoogleAsync}
          style={{width: '100%'}}
        />
        <SquareButton
          title="CONNECT WITH FACEBOOK"
          onPress={handleSignUpWithFacebook}
          buttonBackgroundColor={Colors.facebookBlue}
          style={{marginTop: 20, width: '100%'}}
        />
        <TextMontserrat
          fontSize={12}
          style={{
            textAlign: 'center',
            marginVertical: 10,
            color: Colors.tGrey,
            opacity: 0.67,
          }}>
          By Signing up you agree to our Terms Conditions & Privacy Policy.
        </TextMontserrat>
      </ScrollView>
    </View>
  )
}

export default SignUp
