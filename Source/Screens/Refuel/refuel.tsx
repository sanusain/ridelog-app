import React from "react"
import { AppState, View } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import uuid from "react-native-uuid"
import { connect } from "react-redux"
import ScreenHeader from "../../Components/Header"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { RefuelNavigationProps } from "../../Navigation/types"
import { dispatchHandler } from "../../State-management"
import { RefuelData } from "../Dashboard/types"
import { ActionSetRefuelData } from "./actions"

type Props = { dispatch: any; navigation: RefuelNavigationProps }

const UserRefuelLog: React.FunctionComponent<Props> = (props) => {
  const conversionLiquid = "L"
  const conversionDistance = "Km"
  const currency = "₹"
  const refuelData: Array<RefuelData> = [
    {
      uid: uuid.v4(),
      odo: "2500",
      quantity: "8",
      date: new Date().toDateString(),
      cost: "275.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2570",
      quantity: "4.7",
      date: new Date().toDateString(),
      cost: "300",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2580",
      quantity: "5",
      date: new Date().toDateString(),
      cost: "245.4",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2590",
      quantity: "7",
      date: new Date().toDateString(),
      cost: "2.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2600",
      quantity: "9",
      date: new Date().toDateString(),
      cost: "25.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2800",
      quantity: "25.85",
      date: new Date().toDateString(),
      cost: "268.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2583",
      quantity: "5",
      date: new Date().toDateString(),
      cost: "245.4",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2595",
      quantity: "7",
      date: new Date().toDateString(),
      cost: "2.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2607",
      quantity: "9",
      date: new Date().toDateString(),
      cost: "25.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
    {
      uid: uuid.v4(),
      odo: "2808",
      quantity: "2",
      date: new Date().toDateString(),
      cost: "268.54",
      images: [
        "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
      ],
    },
  ]

  const handleRefuelItem = (refuelData: RefuelData) => {
    console.log("pressed handleRefuelItem")
    console.log("item", refuelData)
    props.dispatch(new ActionSetRefuelData(refuelData))
    props.navigation.navigate("refuelDetails")
  }

  const handleAddLog = () => {
    props.navigation.navigate("addRefuelLog")
  }

  const renderList = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          elevation: 1,
          borderRadius: 10,
          marginVertical: 5,
          paddingVertical: 10,
        }}
        onPress={() => handleRefuelItem(item)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <TextMontserrat fontSize={18} weight={"medium"}>
            {item.date}
          </TextMontserrat>
          <TextMontserrat
            fontSize={18}
            weight={"semibold"}
            style={{ color: Colors.imperialRed, opacity: 0.7 }}
          >
            {currency} {item.cost}
          </TextMontserrat>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            paddingVertical: 2,
          }}
        >
          <TextOpenSans fontSize={16} style={{ color: Colors.default_grey }}>
            Quantity {item.quantity} {conversionLiquid}
          </TextOpenSans>
          <TextOpenSans fontSize={16} style={{ color: Colors.default_grey }}>
            {"   "}Odometer {item.odo} {conversionDistance}
          </TextOpenSans>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScreenHeader
        title={"Refuel"}
        enableAdd={true}
        enableCallback={handleAddLog}
      />
      <View style={{ flex: 1, marginTop: -10 }}>
        <FlatList
          data={refuelData}
          renderItem={renderList}
          keyExtractor={(item) => item.odo.toString()}
        />
      </View>
    </View>
  )
}
const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRefuelLog)
