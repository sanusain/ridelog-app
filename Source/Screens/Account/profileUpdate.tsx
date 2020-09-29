import React, { FunctionComponent } from "react"
import { Text, View } from "react-native"
import Colors from "../../Config/Colors"
import {
  ProfileUpdateNavigationProps,
  ProfileUpdateRouteProp,
} from "../../Navigation/types"

type Props = {
  naviation: ProfileUpdateNavigationProps
  route: ProfileUpdateRouteProp
}

const ProfileUpdate: FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Text>profile update screen</Text>
    </View>
  )
}

export default ProfileUpdate
