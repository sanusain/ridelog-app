import { EvilIcons } from "@expo/vector-icons"
import React, { FunctionComponent } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux"
import Colors from "../Config/Colors"
import { ImageSpecs } from "../Screens/Refuel/types"
import { AppState, dispatchHandler } from "../State-management"

type Props = {
  refuelLogImages: Array<ImageSpecs>
  dispatch?: any
  handleImagePress: (image: ImageSpecs) => void
  handlePlaceHolderImagePress: () => void
}

const CustomImagePicker: FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {props.refuelLogImages.length !== 0 &&
        props.refuelLogImages.map((image) => (
          <TouchableOpacity
            key={image.uid}
            onPress={() => {
              props.handleImagePress(image)
            }}
          >
            <Image
              source={{ uri: image.uri }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 120,
                marginTop: 5,
                marginBottom: 5,
                marginHorizontal: 20,
                borderRadius: 7,
                borderWidth: 1,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
        ))}

      {props.refuelLogImages.length < 2 && (
        <TouchableOpacity onPress={props.handlePlaceHolderImagePress}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 120,
              marginTop: 5,
              marginBottom: 20,
              marginHorizontal: 20,
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

const mapStateToProps = (state: AppState) => ({
  refuelLogImages: state.refuel.addRefuelLog.images,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomImagePicker)
