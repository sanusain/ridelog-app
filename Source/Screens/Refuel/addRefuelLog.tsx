import { MaterialIcons } from "@expo/vector-icons"
import React, { FunctionComponent, useState } from "react"
import { View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { TextInput } from "react-native-paper"
import ScreenHeader from "../../Components/Header"
import SquareButton from "../../Components/SquareButton"
import Colors from "../../Config/Colors"

type Props = {}

/**
 * date time auto, but editable
 * current odo
 * last odometer
 * qty
 * price/lt
 * price auto calculate,non editable
 * location(optional)
 * images
 */

const AddRefuelLog: FunctionComponent<Props> = (props) => {
  const [dateTime, setDateTime] = useState(new Date())
  const [currentOdo, setCurrentOdo] = useState("")
  const [lastOdo, setLastOdo] = useState("0000")
  const [fuelQuantity, setFuelQuantity] = useState("")
  const [pricePerQty, setPricePerQty] = useState("")
  const [cost, setCost] = useState("")
  const [location, setLocation] = useState("")

  const updateCost = () => {
    const cost = (parseFloat(fuelQuantity) * parseFloat(pricePerQty)).toFixed(2)
    setCost(cost)
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
          value={dateTime.toLocaleString()}
          onFocus={() => console.log("launch date time picker")}
        />
        <TextInput
          label={"Current Odometer"}
          mode={"outlined"}
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: { primary: Colors.imperialRed, background: Colors.white },
          }}
          value={currentOdo.toString()}
          onChangeText={(inputText) => {
            console.log(inputText)
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
          onChangeText={(inputText) => {
            console.log(inputText)
          }}
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
            console.log(inputText)
          }}
        />
        <TouchableOpacity
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
        </TouchableOpacity>

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
