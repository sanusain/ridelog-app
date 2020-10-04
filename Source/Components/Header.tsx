import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { FunctionComponent } from "react"
import { TouchableOpacity, View } from "react-native"
import Colors from "../Config/Colors"
import { noop } from "../Util"
import TextMontserrat from "./TextMontserrat"

type Props = {
  title: string
  enableDone?: boolean
  enableAdd?: boolean
  enableCallback?: () => void
}

const ScreenHeader: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 20,
      }}
    >
      <TouchableOpacity
        style={{ padding: 10, justifyContent: "center" }}
        onPress={navigation.goBack}
      >
        <Ionicons name="ios-arrow-back" size={25} color="black" />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextMontserrat
          fontSize={16}
          style={{ alignSelf: "center" }}
          weight={"semibold"}
        >
          {props.title}
        </TextMontserrat>
      </View>
      <TouchableOpacity
        style={{ justifyContent: "center", padding: 10 }}
        onPress={
          props.enableAdd || props.enableDone ? props.enableCallback : noop
        }
      >
        {props.enableAdd || props.enableDone ? (
          props.enableAdd ? (
            <Ionicons name="ios-add" size={30} color={Colors.imperialRed} />
          ) : (
            <MaterialIcons name="done" size={30} color={Colors.imperialRed} />
          )
        ) : null}
      </TouchableOpacity>
    </View>
  )
}

export default ScreenHeader
