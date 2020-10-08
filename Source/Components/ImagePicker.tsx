import { EvilIcons } from "@expo/vector-icons"
import React, { FunctionComponent } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import Colors from "../Config/Colors"
import { ImageSpecs } from "../Screens/Refuel/types"

type Props = {
  images: Array<ImageSpecs>
}

const CustomImagePicker: FunctionComponent<Props> = (props) => {
  const handleImagePress = () => {
    console.log("imagePressed")
  }
  const handlePlaceHolderImagePress = () => {
    console.log("Placeohlder imagePressed")
  }

  return (
    <View style={{ flex: 1 }}>
      {props.images.length !== 0 &&
        props.images.map((image) => (
          <TouchableOpacity key={image.uid} onPress={handleImagePress}>
            <Image
              source={{ uri: image.uri }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 120,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 7,
                borderWidth: 1,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
        ))}

      {props.images.length < 2 && (
        <TouchableOpacity onPress={handlePlaceHolderImagePress}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 120,
              marginTop: 5,
              marginBottom: 20,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: Colors.default_grey,
            }}
          >
            <EvilIcons name="image" size={80} color="black" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CustomImagePicker
