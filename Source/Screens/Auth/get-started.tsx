import React from "react"
import { View } from "react-native"
import SquareButton from "../../Components/SquareButton"
import Colors from "../../Config/Colors"

const GetStarted = () => {
  const handleGetstarted = () => {
    console.log("test")
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 25,
      }}
    >
      <SquareButton
        title="Get started"
        onPress={handleGetstarted}
        style={{ paddingHorizontal: 90 }}
        borderRadius={8}
        buttonBackgroundColor={Colors.imperialRed}
      />
    </View>
  )
}

export default GetStarted
