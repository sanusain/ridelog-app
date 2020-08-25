import React from "react"
import { Image, Text, View } from "react-native"
import Colors from "../Config/Colors"

type Props = {
  albumData: any
}

const Card: React.FunctionComponent<Props> = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "98%",
        height: 120,
        alignSelf: "center",
        borderRadius: 25,
        marginVertical: 5,
        backgroundColor: Colors.Transparent_White,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          marginLeft: 20,
        }}
      >
        <Text style={{ fontSize: 25 }}>Id: {props.albumData.id}</Text>
        <Text style={{ fontSize: 15 }}>Title: {props.albumData.title}</Text>
        <Text></Text>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Image
          source={{ uri: props.albumData.thumbnailUrl }}
          style={{
            resizeMode: "contain",
            borderRadius: 5,
            width: "90%",
            height: "90%",
          }}
        />
      </View>
    </View>
  )
}

export default Card
