import { EvilIcons } from "@expo/vector-icons"
import React, { FunctionComponent } from "react"
import { Image, View } from "react-native"
import Colors from "../Config/Colors"

type Props = {
  images: Array<string>
}

const ImagePicker: FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {props.images.length !== 0 &&
        props.images.map((uri) => (
          <Image
            source={{ uri }}
            key={uri}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 120,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 7,
              borderWidth: 1,
              marginHorizontal: 20,
              resizeMode: "cover",
            }}
          />
        ))}

      {props.images.length < 2 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 120,
            marginTop: 5,
            marginBottom: 20,
            borderRadius: 7,
            borderWidth: 1,
            marginHorizontal: 20,
            borderColor: Colors.default_grey,
          }}
        >
          <EvilIcons name="image" size={80} color="black" />
        </View>
      )}
    </View>
  )
}

export default ImagePicker
