import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { FunctionComponent } from "react"
import { View } from "react-native"
import Colors from "../Config/Colors"
import SquareButton from "./SquareButton"
import TextMontserrat from "./TextMontserrat"
import TextOpenSans from "./TextOpenSans"

type noLogType = "noRefuelLog" | "noServiceLog" | "NoVehicles"

type Props = { noLogType: noLogType; handleOnPress: () => void }

const NoLog: FunctionComponent<Props> = (props) => {
  const size = 100
  const color = Colors.imperialRed
  const style = { opacity: 0.33 }

  const getNoLogIcon = (logType: string) => {
    switch (logType) {
      case "noRefuelLog":
        return (
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={size}
            color={color}
            style={style}
          />
        )
      case "noServiceLog":
        return (
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={size}
            color={color}
            style={style}
          />
        )
    }
  }

  const getNoLogText = (logType: string): [string, string] => {
    switch (logType) {
      case "noRefuelLog":
        return [
          "No Refuel Logs",
          "Press Add log to add a new fuel log for your current vehicle",
        ]

      default:
        return ["default", "default"]
    }
  }

  return (
    <View
      style={{
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {getNoLogIcon(props.noLogType)}
      <View style={{ alignItems: "center" }}>
        <TextMontserrat fontSize={20} weight={"medium"}>
          {getNoLogText(props.noLogType)[0]}
        </TextMontserrat>
        <TextOpenSans
          fontSize={16}
          style={{ textAlign: "center", marginTop: 10 }}
        >
          {getNoLogText(props.noLogType)[1]}
        </TextOpenSans>
      </View>
      <SquareButton
        title={"ADD LOG"}
        onPress={props.handleOnPress}
        buttonBackgroundColor={Colors.imperialRed}
        style={{ marginTop: 30, width: "80%" }}
      />
    </View>
  )
}

export default NoLog
