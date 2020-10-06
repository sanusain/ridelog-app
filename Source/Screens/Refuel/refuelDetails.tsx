import React, { FunctionComponent } from "react"
import { Dimensions, Image, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Carousel from "react-native-snap-carousel"
import { connect } from "react-redux"
import ScreenHeader from "../../Components/Header"
import Colors from "../../Config/Colors"
import { RefuelDetailsNavigationProps } from "../../Navigation/types"
import { AppState, dispatchHandler } from "../../State-management"
import { RefuelData } from "../Dashboard/types"

type Props = {
  refuelData: RefuelData
  navigation: RefuelDetailsNavigationProps
}

const screenWidth = Dimensions.get("window").width

const RefuelDetails: FunctionComponent<Props> = (props) => {
  const renderCarousel = ({ item }: { item: any }) => {
    return (
      <View>
        <Image
          source={{ uri: item }}
          resizeMode={"cover"}
          style={{
            borderWidth: 1,
            width: screenWidth,
            height: (3 / 4) * screenWidth,
          }}
        />
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <ScreenHeader title={"Refuel Details"} />
      <Carousel
        data={props.refuelData.images}
        renderItem={renderCarousel}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop={true}
        autoplay={true}
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
