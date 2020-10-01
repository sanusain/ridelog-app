import React, { FunctionComponent, useState } from "react"
import { View } from "react-native"
import { TextInput } from "react-native-paper"
import ScreenHeader from "../../Components/Header"
import SquareButton from "../../Components/SquareButton"
import Colors from "../../Config/Colors"
import {
  ProfileUpdateNavigationProps,
  ProfileUpdateRouteProp,
} from "../../Navigation/types"

type Props = {
  navigation: ProfileUpdateNavigationProps
  route: ProfileUpdateRouteProp
}

const ProfileUpdate: FunctionComponent<Props> = (props) => {
  const [callsign, setCallsign] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleUpdateProfile = () => {
    console.log("in update profile")
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScreenHeader title={"Profile Update"} />
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <TextInput
          label={"CALLSIGN"}
          mode={"outlined"}
          style={{ color: Colors.imperialRed, marginHorizontal: 20 }}
          theme={{
            colors: {
              primary: Colors.imperialRed,
              background: Colors.white,
            },
          }}
          value={callsign}
          onChangeText={(inputText) => {
            setCallsign(inputText)
          }}
        />
        <TextInput
          label={"EMAIL ADDRESS"}
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
          value={email}
          onChangeText={(inputText) => {
            setEmail(inputText)
          }}
        />
        <TextInput
          label={"PHONE NUMBER"}
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
          value={phone}
          onChangeText={(inputText) => {
            setPhone(inputText)
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
          title={"UPDATE PROFILE"}
          buttonBackgroundColor={Colors.imperialRed}
          onPress={handleUpdateProfile}
          style={{
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  )
}

export default ProfileUpdate
