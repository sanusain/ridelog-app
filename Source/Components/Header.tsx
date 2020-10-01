import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { FunctionComponent } from "react"
import { TouchableOpacity, View } from "react-native"
import TextMontserrat from "./TextMontserrat"

type Props = { title: string }

const ScreenHeader: FunctionComponent<Props> = (props) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 20,
      }}
    >
      <TouchableOpacity onPress={navigation.goBack}>
        <Ionicons name="ios-arrow-back" size={25} color="black" />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextMontserrat
          fontSize={16}
          style={{ alignSelf: "center", marginRight: 24 }} //DR:for compensation the icon width
          weight={"semibold"}
        >
          {props.title}
        </TextMontserrat>
      </View>
    </View>
  )
}

export default ScreenHeader
