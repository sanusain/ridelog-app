import React from "react"
import { View } from "react-native"
import SquareButton from "../../Components/SquareButton"

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
        paddingHorizontal={90}
        borderRadius={8}
      />
    </View>
  )
}

export default GetStarted
