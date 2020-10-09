import DateTimePicker from "@react-native-community/datetimepicker"
import * as ImagePicker from "expo-image-picker"
import React, { createRef, FunctionComponent, useEffect, useState } from "react"
import { Animated, Keyboard, ScrollView, View } from "react-native"
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"
import uuid from "react-native-uuid"
import { connect } from "react-redux"
// import Animated from "react-native-reanimated"
import BottomSheet from "reanimated-bottom-sheet"
import ScreenHeader from "../../Components/Header"
import CustomImagePicker from "../../Components/ImagePicker"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { AppState, dispatchHandler } from "../../State-management"
import {
  ActionAddImage,
  ActionRemoveRefuelLogImage,
  ActionResetImages,
} from "./actions"
import { ImageSpecs } from "./types"

type Props = {
  refuelLogImages: Array<ImageSpecs>
  dispatch: any
}

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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const bottomSheetRef: React.RefObject<BottomSheet> = createRef()
  const [animatedOpacity] = useState(new Animated.Value(1))

  useEffect(() => {
    return () => {
      // clearing images when screen is left.
      if (props.refuelLogImages.length) props.dispatch(new ActionResetImages())
    }
  }, [])

  const updateCost = () => {
    const cost = (parseFloat(fuelQuantity) * parseFloat(pricePerQty)).toFixed(2)
    if (cost !== "NaN") setCost(cost)
    else setCost("")
  }

  const setBackgroundOpacity = (mode: boolean) => {
    if (mode) {
      Animated.timing(animatedOpacity, {
        toValue: 0.3, //sets opacity
        duration: 100,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 1, //removes opacity
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }

  const hideBottomSheet = () => {
    setIsBottomSheetOpen(false)
    setBackgroundOpacity(false)
    bottomSheetRef.current?.snapTo(1)
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

  const handleFromGallery = async () => {
    console.log("from gallery picture")
    hideBottomSheet()

    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== "granted") {
      console.log("permission denied")
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      console.log("in result", result.uri)
      const image: ImageSpecs = {
        uid: uuid.v4(),
        uri: result.uri,
        height: result.height,
        width: result.width,
      }
      props.dispatch(new ActionAddImage(image))
    }
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
        onOpenEnd={() => {
          setBackgroundOpacity(true)
        }}
        onCloseEnd={() => {
          hideBottomSheet()
        }}
      />
      <ScreenHeader title={"New log"} />
      <Animated.View
        style={{ marginTop: -10, opacity: animatedOpacity }}
        pointerEvents={isBottomSheetOpen ? "none" : undefined}
      >
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
        <CustomImagePicker
          handleImagePress={(image: ImageSpecs) => {
            props.dispatch(new ActionRemoveRefuelLogImage(image))
          }}
          handlePlaceHolderImagePress={() => {
            setIsBottomSheetOpen(true)
            bottomSheetRef.current?.snapTo(0)
          }}
        />

        <SquareButton
          title={"ADD LOG"}
          onPress={handleAddLog}
          buttonBackgroundColor={Colors.imperialRed}
          style={{
            alignSelf: "center",
            marginTop: 5,
            marginBottom: 20,
            opacity: 0.9,
          }}
        />
      </Animated.View>
    </ScrollView>
  )
}

const mapStateToProps = (state: AppState) => ({
  refuelLogImages: state.refuel.addRefuelLog.images,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRefuelLog)
