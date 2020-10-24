import { AntDesign } from "@expo/vector-icons"
import React, { FunctionComponent, useState } from "react"
import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Carousel from "react-native-snap-carousel"
import { connect } from "react-redux"
import ScreenHeader from "../../Components/Header"
import ImageView from "../../Components/ImageView"
import Colors from "../../Config/Colors"
import { RefuelDetailsNavigationProps } from "../../Navigation/types"
import { AppState, dispatchHandler } from "../../State-management"
import { RefuelData } from "../Dashboard/types"
import {
  ActionResetImageViewInitialIndex,
  ActionSetImageViewInitialIndex,
} from "./actions"

type Props = {
  dispatch: any
  refuelData: RefuelData
  navigation: RefuelDetailsNavigationProps
}

const screenWidth = Dimensions.get("window").width

const RefuelDetails: FunctionComponent<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)

  const closeModal = () => {
    props.dispatch(new ActionResetImageViewInitialIndex())
    setModalVisible(false)
  }

  const renderCarousel = ({ item }: { item: any }) => {
    return (
      <View>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <Image
            source={{ uri: item }}
            resizeMode={"cover"}
            style={{
              borderWidth: 1,
              width: screenWidth,
              height: (3 / 4) * screenWidth,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return modalVisible ? (
    <Modal visible={modalVisible} onRequestClose={closeModal}>
      <View style={{ flex: 1 }}>
        <ImageView images={props.refuelData.images} />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: 20,
          }}
          onPress={closeModal}
        >
          <AntDesign name={"close"} size={40} color={Colors.default_grey} />
        </TouchableOpacity>
      </View>
    </Modal>
  ) : (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <ScreenHeader title={"Refuel Details"} />
      <Carousel
        data={props.refuelData.images}
        renderItem={renderCarousel}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => {
          props.dispatch(new ActionSetImageViewInitialIndex(index))
        }}
      />
    </ScrollView>
  )
}

const mapStateToProps = (state: AppState) => ({
  refuelData: state.selectedVehicle.refuelData[0],
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(RefuelDetails)
