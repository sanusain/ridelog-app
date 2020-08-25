import Constants from "expo-constants"
import React from "react"
import { View } from "react-native"

type Props = { children: any }

const SafeAreaView: React.FunctionComponent<Props> = (props) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
      }}
    >
      {props.children}
    </View>
  )
}

export default SafeAreaView
