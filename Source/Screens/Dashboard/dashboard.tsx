import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useContext, useEffect } from "react"
import { Dimensions, Image, ScrollView, View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { TouchableOpacity } from "react-native-gesture-handler"
import Carousel from "react-native-snap-carousel"
import { connect } from "react-redux"
import ScreenHeader from "../../Components/Header"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import Colors from "../../Config/Colors"
import { AuthContext } from "../../Contexts/AuthProvider"
import { hydrateVehiclesInfo } from "../../Database/backgroundJobs"
import {
  DashboardNavigationProp,
  DashboardRouteProp,
} from "../../Navigation/types"
import { AppState, dispatchHandler } from "../../State-management"
import { vehicleInfo } from "./types"

type Props = {
  vehiclesInfo: Array<vehicleInfo>
  selectedVehicle: vehicleInfo
  navigation: DashboardNavigationProp
  dispatch: any
  route: DashboardRouteProp
}

const DashBoard: React.FunctionComponent<Props> = (props) => {
  const screenWidth = Dimensions.get("window").width

  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!props.vehiclesInfo.length) {
      hydrateVehiclesInfo(props.dispatch)
    }
  }, [])

  const renderCarouselVehicle = ({ item }: { item: any }) => {
    return (
      <View style={{ height: 0.5 * screenWidth }}>
        <Image
          resizeMode="cover"
          source={{ uri: item }}
          style={{ borderRadius: 10, width: "100%", height: "100%" }}
        />
      </View>
    )
  }
  const renderCarouselTips = ({ item }: { item: any }) => {
    return (
      <View style={{ height: 60 }}>
        <Image
          resizeMode="cover"
          source={{ uri: item }}
          style={{ borderRadius: 5, width: "100%", height: "100%" }}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: Colors.white,
      }}
    >
      <ScreenHeader
        title={"Welcome, " + user?.callSign}
        enableAdd={true}
        enableCallback={() => {
          props.navigation.navigate("addVehicle")
        }}
      />
      <View
        style={{
          marginTop: -10,
          marginBottom: 10,
          borderTopWidth: 1, //intentional
          borderColor: Colors.imperialRed, //intentional
          marginRight: 100,
        }}
      />
      {!props.selectedVehicle ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <MaterialCommunityIcons
            name={"garage-open"}
            size={200}
            color={Colors.spaceCadetPurple}
            style={{ opacity: 0.56 }}
          />

          <TextMontserrat
            fontSize={24}
            weight={"semibold"}
            style={{
              textAlign: "center",
              color: Colors.default_grey,
            }}
          >
            Empty Garage
          </TextMontserrat>
          <TextMontserrat
            fontSize={18}
            style={{
              textAlign: "center",
              paddingHorizontal: 50,
              marginTop: 10,
              letterSpacing: 0.8,
              color: Colors.default_grey,
            }}
          >
            Your Garage is empty, Add a vehicle and give it a purpose
          </TextMontserrat>
          <SquareButton
            title={"ADD VEHICLE"}
            buttonBackgroundColor={Colors.imperialRed}
            onPress={() => props.navigation.navigate("addVehicle")}
            width={"50%"}
            style={{ opacity: 0.87, marginTop: 40 }}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginVertical: 5 }}
        >
          <View>
            <Carousel
              data={props.selectedVehicle.images}
              renderItem={renderCarouselVehicle}
              sliderWidth={screenWidth}
              itemWidth={screenWidth / 1.2}
              loop={true}
              autoplay={true}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.inputBackGroundWhite,
              marginTop: 10,
              marginHorizontal: 8,
              padding: 10,
              borderRadius: 8,
              elevation: 5,
            }}
            onPress={() => {
              console.log("switch ride")
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 5,
                alignItems: "center",
              }}
            >
              <TextMontserrat fontSize={16} weight={"medium"}>
                Ride
              </TextMontserrat>
              <TextMontserrat fontSize={16} weight={"medium"}>
                {props.selectedVehicle.vcallsign}
              </TextMontserrat>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 5,
                alignItems: "center",
              }}
            >
              <TextMontserrat fontSize={16} weight={"medium"}>
                Distance Logged
              </TextMontserrat>
              <TextMontserrat fontSize={16} weight={"medium"}>
                {props.selectedVehicle.odo} {"KMs"}
              </TextMontserrat>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 5,
                alignItems: "center",
              }}
            >
              <TextMontserrat fontSize={16} weight={"medium"}>
                Last Refuel
              </TextMontserrat>
              <TextMontserrat fontSize={16} weight={"medium"}>
                {new Date().toDateString()}
              </TextMontserrat>
            </View>
          </TouchableOpacity>

          {/* **************************fuel consumed in month */}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={screenWidth - 10}
              height={220}
              yAxisSuffix={"L"}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Carousel
              data={props.selectedVehicle.images}
              renderItem={renderCarouselTips}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 10}
              loop={true}
              autoplay={true}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

/* *currently seelected vehicle holds the first vehicle
 * of all veihcles list ie vehiclesInfo. later this will be changed
 * to selected vehicle state when user will be able to pick the vehicle
 */
const mapStateToProps = (state: AppState) => ({
  selectedVehicle: state.vehiclesInfo[0],
  vehiclesInfo: state.vehiclesInfo,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
