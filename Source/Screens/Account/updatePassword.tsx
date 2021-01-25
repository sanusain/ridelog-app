import React, {useState} from 'react'
import {View} from 'react-native'
import {ActivityIndicator, TextInput} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {apiResetPassword} from '../../api/accounts'
import ScreenHeader from '../../Components/Header'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import Colors from '../../Config/Colors'
import {UpdatePasswordNavigationProps} from '../../Navigation/types'

type Props = {
  navigation: UpdatePasswordNavigationProps
}

const UpdatePassword: React.FunctionComponent<Props> = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [smallPassLength, setSmallPassLength] = useState(false)
  const [updateSuccessful, setUpdateSuccessful] = useState(false)

  const passwordMinLength = 8

  const resetErrors = () => {
    setUpdateSuccessful(false)
    setPasswordMismatch(false)
    setEmptyFields(false)
    setInvalidPassword(false)
    setSmallPassLength(false)
  }

  const handleUpdatePassword = () => {
    resetErrors()

    if (!currentPassword && !newPassword && !confirmPassword) {
      setEmptyFields(true)
      return
    }

    if (confirmPassword.length < passwordMinLength) {
      setSmallPassLength(true)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true)
      return
      // eslint-disable-next-line no-else-return
    } else setPasswordMismatch(false)

    setIsLoading(true)
    apiResetPassword(currentPassword, confirmPassword)
      .then(() => {
        setIsLoading(false)
        setUpdateSuccessful(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        console.log('in sucess')
      })
      .catch((err) => {
        console.log('in error', err.response.data)
        setInvalidPassword(true)
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading ? (
        <View
          style={{
            backgroundColor: Colors.white,
            opacity: 0.33,
            position: 'absolute',
            justifyContent: 'center',
            zIndex: 1,
            left: 0,
            right: 0,
            height: '100%',
          }}>
          <ActivityIndicator
            size="large"
            style={{marginTop: '50%'}}
            color={Colors.imperialRed}
          />
        </View>
      ) : null}
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <ScreenHeader title="Update Password" enableBack />
        <View style={{marginTop: 10, marginBottom: 20}}>
          <TextInput
            label="Current Password"
            mode="outlined"
            textContentType="password"
            secureTextEntry
            style={{color: Colors.imperialRed, marginHorizontal: 20}}
            theme={{
              colors: {
                primary: Colors.imperialRed,
                background: Colors.white,
              },
            }}
            value={currentPassword}
            onChange={() => {
              if (
                invalidPassword ||
                passwordMismatch ||
                emptyFields ||
                smallPassLength
              )
                resetErrors()
            }}
            onChangeText={(inputText) => {
              setCurrentPassword(inputText)
            }}
          />
          <TextInput
            label="New Password"
            mode="outlined"
            style={{
              color: Colors.imperialRed,
              marginHorizontal: 20,
              marginTop: 18,
            }}
            textContentType="newPassword"
            secureTextEntry
            theme={{
              colors: {
                primary: Colors.imperialRed,
                background: Colors.white,
              },
            }}
            value={newPassword}
            onChange={() => {
              if (
                invalidPassword ||
                passwordMismatch ||
                emptyFields ||
                smallPassLength
              )
                resetErrors()
            }}
            onChangeText={(inputText) => {
              setNewPassword(inputText)
            }}
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            style={{
              color: Colors.imperialRed,
              marginHorizontal: 20,
              marginTop: 18,
            }}
            textContentType="newPassword"
            secureTextEntry
            theme={{
              colors: {
                primary: Colors.imperialRed,
                background: Colors.white,
              },
            }}
            value={confirmPassword}
            onChange={() => {
              if (
                invalidPassword ||
                passwordMismatch ||
                emptyFields ||
                smallPassLength
              )
                resetErrors()
            }}
            onChangeText={(inputText) => setConfirmPassword(inputText)}
          />
          <View style={{height: 10}} />
          {smallPassLength ? (
            <TextMontserrat
              fontSize={14}
              fontColor={Colors.imperialRed}
              weight="semibold"
              style={{marginTop: 5, alignSelf: 'center'}}>
              Password needs to be atleast 8 characters.
            </TextMontserrat>
          ) : null}
          {invalidPassword ? (
            <TextMontserrat
              fontSize={14}
              fontColor={Colors.imperialRed}
              weight="semibold"
              style={{
                marginTop: 5,
                alignSelf: 'center',
                marginHorizontal: 10,
                textAlign: 'center',
              }}>
              Update Failed ! Check current password or internet connenction
            </TextMontserrat>
          ) : null}
          {emptyFields ? (
            <TextMontserrat
              fontSize={14}
              fontColor={Colors.imperialRed}
              weight="medium"
              style={{marginTop: 5, alignSelf: 'center'}}>
              All fields are required
            </TextMontserrat>
          ) : null}
          {passwordMismatch ? (
            <TextMontserrat
              fontSize={14}
              fontColor={Colors.imperialRed}
              weight="medium"
              style={{marginTop: 5, alignSelf: 'center'}}>
              New and Confirm password doesnt match
            </TextMontserrat>
          ) : null}
          {updateSuccessful ? (
            <View
              style={{
                borderWidth: 1,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="checkmark-circle-sharp"
                size={25}
                color={Colors.imperialRed}
              />
              <TextMontserrat
                fontSize={14}
                fontColor={Colors.imperialRed}
                weight="medium"
                style={{alignSelf: 'center', marginLeft: 10}}>
                Password Updated
              </TextMontserrat>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <Ionicons
            name="ios-information-circle-outline"
            size={25}
            color={Colors.imperialRed}
            style={{padding: 10}}
          />
          <TextMontserrat
            fontSize={14}
            fontColor={Colors.default_grey}
            style={{letterSpacing: 0.55, marginBottom: 20}}
            weight="medium">
            Updating password requires an active internet connection
          </TextMontserrat>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <SquareButton
            title="UPDATE PASSWORD"
            buttonBackgroundColor={Colors.redLite}
            onPress={handleUpdatePassword}
            style={{
              marginBottom: 20,
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </>
  )
}

export default UpdatePassword
