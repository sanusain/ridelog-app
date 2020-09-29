import React, { FunctionComponent } from "react"
import { Text, View } from "react-native"
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
    <View>
      <Text>profile update screen</Text>
    </View>
  )
}

export default ProfileUpdate
