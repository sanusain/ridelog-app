import DateTimePicker from "@react-native-community/datetimepicker"
import React, { FunctionComponent, useState } from "react"
import { Keyboard, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"
import ScreenHeader from "../../Components/Header"
import ImagePicker from "../../Components/ImagePicker"
import SquareButton from "../../Components/SquareButton"
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

  const updateCost = () => {
    const cost = (parseFloat(fuelQuantity) * parseFloat(pricePerQty)).toFixed(2)
    if (parseFloat(cost) !== NaN) setCost(cost)
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
  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <ScreenHeader title={"New log"} />
      <View style={{ marginTop: -10 }}>
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
        {/* <TouchableOpacity
          style={{
            height: 120,
            marginVertical: 20,
            borderRadius: 7,
            borderWidth: 1,
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.default_grey,
          }}
        >
          <MaterialIcons
            name="add-a-photo"
            size={35}
            color={Colors.imperialRed}
            style={{ opacity: 0.67 }}
          />
        </TouchableOpacity> */}
        <View style={{ flex: 1 }}>
          <ImagePicker
            images={[
              "https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg",
              // "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU85aYM9cVv8Ysoaki9agKiHHrlFMmtwZ_GA&usqp=CAU",
            ]}
          />
        </View>

        <SquareButton
          title={"ADD LOG"}
          onPress={handleAddLog}
          buttonBackgroundColor={Colors.imperialRed}
          style={{ alignSelf: "center", marginBottom: 20, opacity: 0.9 }}
        />
      </View>
    </ScrollView>
  )
}

export default AddRefuelLog
