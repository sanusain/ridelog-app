import {BlurView} from '@react-native-community/blur'
import ObjectID from 'bson-objectid'
import React, {useState} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {connect} from 'react-redux'
import Colors from '../Config/Colors'
import type {ImageSpecs} from '../Screens/Refuel/types'
import {AppState, dispatchHandler} from '../State-management'
import TextMontserrat from './TextMontserrat'

type Props = {
  refuelLogImages: Array<ImageSpecs>
  handleImagePress: (image: ImageSpecs) => void
  handlePlaceHolderImagePress: () => void
}

const CustomImagePicker: React.FunctionComponent<Props> = (props: Props) => {
  const [deleteBlur, setDeleteBlur] = useState(false)
  const [deleteImage, setDeleteImage] = useState({})

  return (
    <View style={{flex: 1}}>
      {props.refuelLogImages.length !== 0 &&
        props.refuelLogImages.map((image) => (
          <View key={image._id}>
            <TouchableOpacity
              onPress={() => {
                setDeleteImage(image)
                setDeleteBlur(true)
              }}>
              <Image
                source={{uri: image.url}}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 120,
                  marginTop: 5,
                  marginBottom: 5,
                  marginHorizontal: 20,
                  borderRadius: 7,
                  borderWidth: 1,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
            {deleteImage.url === image.url && deleteBlur ? ( // delete overlay
              <BlurView
                key={new ObjectID().str}
                blurAmount={20}
                blurType="light"
                style={{
                  position: 'absolute',
                  width: '90%',
                  height: 120,
                  marginTop: 5,
                  left: 20,
                  borderRadius: 5,
                  flex: 1,
                }}>
                <View
                  style={{
                    overflow: 'hidden',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.redLite,
                      borderRadius: 7,
                      padding: 7,
                    }}
                    onPress={() => {
                      setDeleteBlur(false)
                      props.handleImagePress(deleteImage)
                    }}>
                    <TextMontserrat
                      fontSize={16}
                      weight="semibold"
                      fontColor={Colors.white}
                      style={{letterSpacing: 0.7}}>
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
                    }}>
                    <TextMontserrat
                      fontSize={16}
                      weight="semibold"
                      fontColor={Colors.white}
                      style={{letterSpacing: 0.7}}>
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
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
              marginTop: 5,
              marginBottom: 20,
              marginHorizontal: 20,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: Colors.default_grey,
            }}>
            <EvilIcons name="image" size={80} color="black" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

const mapStateToProps = (state: AppState) => {
  console.log(
    'state.refuel.addRefuelLog.images',
    state.refuel.addRefuelLog.images,
  )

  return {
    refuelLogImages: state.refuel.addRefuelLog.images,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomImagePicker)
