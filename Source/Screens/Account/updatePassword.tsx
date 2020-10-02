import React, { FunctionComponent, useState } from "react"
import { View } from "react-native"
import { TextInput } from "react-native-paper"
import ScreenHeader from "../../Components/Header"
import SquareButton from "../../Components/SquareButton"
import Colors from "../../Config/Colors"
import { updatePasswordNavigationProps } from "../../Navigation/types"

type Props = { navigation: updatePasswordNavigationProps }

const UpdatePassword: FunctionComponent<Props> = (props) => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const disabledButton = () => {
    if (newPassword !== confirmPassword) return true
    return false
  }

  const handleChangePassword = () => {
    console.log("in change password")
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <ScreenHeader title={"Change Password"} />
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <TextInput
          label={"New Password"}
          mode={"outlined"}
          style={{ color: Colors.imperialRed, marginHorizontal: 20 }}
          theme={{
            colors: {
              primary: Colors.imperialRed,
              background: Colors.white,
            },
          }}
          value={newPassword}
          onChangeText={(inputText) => {
            setNewPassword(inputText)
          }}
        />
        <TextInput
          label={"Confirm Password"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginTop: 18,
          }}
          theme={{
            colors: {
              primary: Colors.imperialRed,
              background: Colors.white,
            },
          }}
          value={confirmPassword}
          onChangeText={(inputText) => {
            setConfirmPassword(inputText)
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <SquareButton
          title={"UPDATE PASSWORD"}
          buttonBackgroundColor={Colors.imperialRed}
          onPress={handleChangePassword}
          style={{
            marginBottom: 20,
            alignSelf: "center",
            opacity: disabledButton() ? 0.67 : 0.99,
          }}
          disabled={disabledButton()}
        />
      </View>
    </View>
  )
}

export default UpdatePassword
