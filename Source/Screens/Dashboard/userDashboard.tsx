import { Ionicons } from "@expo/vector-icons"
import React, { useContext, useEffect } from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { AuthContext } from "../../Contexts/AuthProvider"
import { hydrateVehiclesInfo } from "../../Database"
import { AppState, dispatchHandler } from "../../State-management"
import { vehicleInfo } from "./types"

type Props = {
  vehiclesInfo: Array<vehicleInfo>
  navigation: any
  dispatch: any
  route: any
}

const userDashboard: React.FunctionComponent<Props> = (props) => {
  const { user } = useContext(AuthContext)

  // useEffect(() => {
  //   console.log("user", user)

  //   firebase.auth().onAuthStateChanged((userLogged) => {
  //     if (!userLogged)
  //       Alert.alert(
  //         "Re Login",
  //         "Youre logged out of cloud, Please relogin",
  //         [
  //           {
  //             text: "Re login",
  //             onPress: () => {
  //               logout()
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       )
  //   })
  // }, [])

  useEffect(() => {
    if (!props.vehiclesInfo.length) {
      hydrateVehiclesInfo(props.dispatch)
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: Colors.white,
      }}
    >
      <TextOpenSans
        fontSize={20}
        style={{
          alignSelf: "flex-start",
          marginTop: 20,
          marginLeft: 10,
          opacity: 0.87,
          color: Colors.imperialRed,
        }}
      >
        Welcome, {user?.callSign}
      </TextOpenSans>
      <View
        style={{
          borderTopWidth: 1, //intentional
          borderColor: Colors.imperialRed, //intentional
          marginRight: 100,
        }}
      />
      {!props.vehiclesInfo.length ? (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: "100%",
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={() => {
            props.navigation.navigate("addVehicle")
          }}
        >
          <Ionicons
            name="ios-add-circle"
            size={70}
            color={Colors.imperialRed}
            style={{ opacity: 0.85 }}
          />
          <TextMontserrat fontSize={20} style={{ color: Colors.manateeGrey }}>
            Add new ride
          </TextMontserrat>
        </TouchableOpacity>
      ) : (
        <View style={{ alignSelf: "center" }}>
          <Text>{props.vehiclesInfo[0].vcallsign}</Text>
          <Text>{props.vehiclesInfo[0].maker}</Text>
          <Text>{props.vehiclesInfo[0].model}</Text>
          <Text>{props.vehiclesInfo[0].odo}</Text>
          <Text>{props.vehiclesInfo[0].plate}</Text>
          <Text>{props.vehiclesInfo[0].vin}</Text>
          <Text>{props.vehiclesInfo[0].year}</Text>
        </View>
      )}
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({
  vehiclesInfo: state.vehiclesInfo,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userDashboard)
