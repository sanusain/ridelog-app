import { EvilIcons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import React, { FunctionComponent, useState } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import uuid from "react-native-uuid"
import { connect } from "react-redux"
import Colors from "../Config/Colors"
import { ImageSpecs } from "../Screens/Refuel/types"
import { AppState, dispatchHandler } from "../State-management"
import TextMontserrat from "./TextMontserrat"

type Props = {
  refuelLogImages: Array<ImageSpecs>
  dispatch?: any
  handleImagePress: (image: ImageSpecs) => void
  handlePlaceHolderImagePress: () => void
}

const CustomImagePicker: FunctionComponent<Props> = (props) => {
  const [deleteBlur, setDeleteBlur] = useState(false)
  const [deleteImage, setDeleteImage] = useState({})

  return (
    <View style={{ flex: 1 }}>
      {props.refuelLogImages.length !== 0 &&
        props.refuelLogImages.map((image) => (
          <View key={image.uid}>
            <TouchableOpacity
              onPress={() => {
                setDeleteImage(image)
                setDeleteBlur(true)
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

            {deleteBlur ? ( // delete overlay
              <BlurView
                key={uuid.v4()}
                intensity={100}
                style={{
                  backgroundColor: Colors.white,
                  position: "absolute",
                  width: "90%",
                  height: 120,
                  marginTop: 5,
                  marginBottom: 5,
                  marginHorizontal: 20,
                  borderRadius: 7,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.redLite,
                      borderRadius: 7,
                      padding: 7,
                    }}
                    onPress={() => {
                      setDeleteBlur(false)
                      //@ts-ignore      // doesnt need to type typechecked. used in this file only.
                      props.handleImagePress(deleteImage)
                      console.log("pressed delete")
                    }}
                  >
                    <TextMontserrat
                      fontSize={16}
                      weight={"semibold"}
                      fontColor={Colors.white}
                      style={{ letterSpacing: 0.7 }}
                    >
                      Delete
                    </TextMontserrat>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.redLite,
                      borderRadius: 7,
                      padding: 7,
                    }}
                    onPress={() => {
                      setDeleteBlur(false)
                      console.log("pressed cancel")
                    }}
                  >
                    <TextMontserrat
                      fontSize={16}
                      weight={"semibold"}
                      fontColor={Colors.white}
                      style={{ letterSpacing: 0.7 }}
                    >
                      Cancel
                    </TextMontserrat>
                  </TouchableOpacity>
                </View>
              </BlurView>
            ) : null}
          </View>
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
