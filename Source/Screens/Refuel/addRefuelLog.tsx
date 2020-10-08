import DateTimePicker from "@react-native-community/datetimepicker"
import React, { createRef, FunctionComponent, useState } from "react"
import { Animated, Keyboard, ScrollView, View } from "react-native"
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"
// import Animated from "react-native-reanimated"
import BottomSheet from "reanimated-bottom-sheet"
import ScreenHeader from "../../Components/Header"
import ImagePicker from "../../Components/ImagePicker"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"

type Props = {}

const AddRefuelLog: FunctionComponent<Props> = (props) => {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [currentOdo, setCurrentOdo] = useState("")
  const [lastOdo, setLastOdo] = useState("0000")
  const [fuelQuantity, setFuelQuantity] = useState("")
  const [pricePerQty, setPricePerQty] = useState("")
  const [cost, setCost] = useState("")
  const [location, setLocation] = useState("")

  const bottomSheetRef: React.RefObject<BottomSheet> = createRef()
  const [animatedOpacity] = useState(new Animated.Value(1))
  const [isVisible, setIsVisible] = useState(true)

  const updateCost = () => {
    const cost = (parseFloat(fuelQuantity) * parseFloat(pricePerQty)).toFixed(2)
    if (parseFloat(cost) !== NaN) setCost(cost)
  }

  const setBackgroundOpacity = () => {
    if (isVisible === true) {
      Animated.timing(animatedOpacity, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }).start()
      setIsVisible(false)
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start()
      setIsVisible(true)
    }
  }

  const hideBottomSheet = () => {
    bottomSheetRef.current?.snapTo(1)
    setBackgroundOpacity()
  }

  const handleShowDateDialog = () => {
    Keyboard.dismiss()
    showMode("date")
  }

  const showMode = (mode: string) => {
    setMode(mode)
    setShow(true)
  }

  const onChangeDate = (event: any, selectedDate: Date) => {
    setShow(false)
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  const handleAddLog = () => {
    console.log("add log pressed")
  }

  const handleTakePicture = () => {
    console.log("take picture")
    hideBottomSheet()
  }

  const handleFromGallery = () => {
    console.log("from gallery picture")
    hideBottomSheet()
  }

  const renderBottomSheetContent = () => (
    <View
      style={{
        backgroundColor: Colors.white,
        elevation: 5,
        justifyContent: "center",
        padding: 16,
        borderTopWidth: 3,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderRadius: 10,
        borderTopColor: Colors.default_grey,
        borderRightColor: Colors.white,
        borderLeftColor: Colors.white,
      }}
    >
      <View // horizontal artifact
        style={{
          borderWidth: 3,
          width: "10%",
          alignSelf: "center",
          borderRadius: 5,
          marginBottom: 20,
          borderColor: Colors.default_grey,
          opacity: 0.5,
        }}
      />
      <View style={{ alignItems: "center" }}>
        <TextMontserrat fontSize={24}>Choose Image</TextMontserrat>
        <TextMontserrat fontSize={16}>
          Pick an image from gallery or using camera
        </TextMontserrat>
      </View>

      <View
        style={{
          marginTop: 20,
          paddingHorizontal: "10%",
        }}
      >
        <TouchableWithoutFeedback
          onPress={handleTakePicture}
          style={{ alignItems: "center" }}
        >
          <SquareButton
            title={"Take Picture"}
            buttonBackgroundColor={Colors.imperialRed}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={handleFromGallery}
          style={{ alignItems: "center", marginVertical: 10 }}
        >
          <SquareButton
            title={"Choose from Gallery"}
            buttonBackgroundColor={Colors.imperialRed}
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            hideBottomSheet()
          }}
          style={{ marginTop: 10, marginBottom: 20, alignItems: "center" }}
        >
          <TextOpenSans
            fontSize={18}
            weight="semibold"
            style={{ color: Colors.imperialRed }}
          >
            Cancel
          </TextOpenSans>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["40%", "0%"]}
        renderContent={renderBottomSheetContent}
        enabledGestureInteraction={true}
        initialSnap={1}
        enabledInnerScrolling={false}
        enabledBottomClamp={true}
        onCloseEnd={hideBottomSheet}
      />
      <ScreenHeader title={"New log"} />
      <Animated.View style={{ marginTop: -10, opacity: animatedOpacity }}>
        <TextInput
          label={"Date and Time"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={date.toDateString()}
          onFocus={handleShowDateDialog}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            //@ts-ignore
            mode={mode}
            is24Hour={true}
            display="default"
            //@ts-ignore
            onChange={onChangeDate}
          />
        )}
        <TextInput
          label={"Current Odometer"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          keyboardType={"number-pad"}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={currentOdo}
          onChangeText={(inputText) => {
            setCurrentOdo(inputText)
          }}
        />
        <TextInput
          label={"Last Odometer"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={lastOdo}
          editable={false}
        />
        <TextInput
          label={"Fuel Quantity"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          keyboardType={"number-pad"}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={fuelQuantity}
          onChangeText={(inputText) => {
            setFuelQuantity(inputText)
          }}
          onEndEditing={updateCost}
        />
        <TextInput
          label={"Price/L"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          keyboardType={"number-pad"}
          value={pricePerQty}
          onChangeText={(inputText) => {
            setPricePerQty(inputText)
          }}
          onEndEditing={updateCost}
        />
        <TextInput
          label={"Cost"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={cost}
          editable={false}
        />
        <TextInput
          label={"Location"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={location}
          onChangeText={(inputText) => {
            setLocation(inputText)
          }}
        />
        <View
          style={{ flex: 1, marginHorizontal: 20 }}
          onTouchStart={() => {
            setBackgroundOpacity()
            bottomSheetRef.current?.snapTo(0)
          }}
        >
          <ImagePicker
            images={
              [
                // "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
                // "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
              ]
            }
          />
        </View>

        <SquareButton
          title={"ADD LOG"}
          onPress={handleAddLog}
          buttonBackgroundColor={Colors.imperialRed}
          style={{ alignSelf: "center", marginBottom: 20, opacity: 0.9 }}
        />
      </Animated.View>
    </ScrollView>
  )
}

export default AddRefuelLog
