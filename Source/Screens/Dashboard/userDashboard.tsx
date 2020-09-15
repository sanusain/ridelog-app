import { Ionicons } from "@expo/vector-icons"
import React, { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { firebase } from "../../Config/firebase"
import { AuthContext } from "../../Contexts/AuthProvider"
import { AppState, dispatchHandler } from "../../State-management"

type Props = { navigation: any }

const userDashboard: React.FunctionComponent<Props> = (props) => {
  const [userData, setuserData] = useState(true)
  const { user, logout } = useContext(AuthContext)

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
  async function somethign() {
    const data = await firebase
      .firestore()
      .collection("vehicleInfo")
      .doc(user?.uid)
      .collection("vehicles")
      .get()
    const vehicleList: firebase.firestore.DocumentData[] = []
    data.forEach((collectiondata) => {
      vehicleList.push(collectiondata.data())
    })
    console.log("vehicle list", vehicleList)
  }

  useEffect(() => {
    somethign()
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
      {userData ? (
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
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
        <View />
      )}
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userDashboard)
