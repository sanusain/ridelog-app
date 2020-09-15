import { Formik } from "formik"
import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import * as yup from "yup"
import LightTextInput from "../../Components/LightTextInput"
import SquareButton from "../../Components/SquareButton"
import TextMontserrat from "../../Components/TextMontserrat"
import Colors from "../../Config/Colors"
import { firebase } from "../../Config/firebase"
import {
  AddVehicleNavigationProp,
  AddVehicleRouteProp,
} from "../../Navigation/types"

type Props = {
  navigation: AddVehicleNavigationProp
  route: AddVehicleRouteProp
}

const addVehicleSchema = yup.object({
  vcallsign: yup
    .string()
    .required("Your vehicle needs a short callsign")
    .min(2)
    .max(10),
  year: yup.string().required("Please enter a valid year").max(4),
  maker: yup.string().required(),
  model: yup.string().required(),
  odo: yup.string().required(),
  plate: yup.string(),
  vin: yup.string(),
})

const AddVehicle: React.FunctionComponent<Props> = (props) => {
  const handleSubmit = (inputValues: {
    vcallsign: string
    year: string
    maker: string
    model: string
    odo: string
    plate: string
    vin: string
  }) => {
    const validatedInputData = {
      vcallsign: inputValues.vcallsign,
      year: inputValues.year,
      maker: inputValues.maker,
      model: inputValues.model,
      odo: inputValues.odo,
      plate: inputValues.plate,
      vin: inputValues.vin,
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const vehicleInfoRef = firebase
          .firestore()
          .collection("vehicleInfo")
          .doc(user.uid)
          .collection("vehicles")
          .doc(validatedInputData.vcallsign)

        vehicleInfoRef.set(validatedInputData).then(() => {
          console.log("data set in firebase")
          props.navigation.navigate("dashboard")
        })
      }
    })
  }

  return (
    <ScrollView
      style={{
        width: "90%",
        alignSelf: "center",
        marginVertical: 10,
      }}
    >
      <Formik
        initialValues={{
          vcallsign: "",
          year: "",
          maker: "",
          model: "",
          odo: "",
          plate: "",
          vin: "",
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.resetForm()
        }}
        validationSchema={addVehicleSchema}
      >
        {(props) => (
          <View style={{ alignItems: "center" }}>
            <LightTextInput
              placeholder={"Vehicle Callsign"}
              //@ts-ignore
              value={props.values.vcallsign}
              onChangeText={props.handleChange("vcallsign")}
              OnBlur={props.handleBlur("vcallsign")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.vcallsign && props.errors.vcallsign}
            </TextMontserrat>
            <LightTextInput
              placeholder={"Year"}
              //@ts-ignore
              value={props.values.year}
              keyboardType={"numeric"}
              onChangeText={props.handleChange("year")}
              onBlur={props.handleBlur("year")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.year && props.errors.year}
            </TextMontserrat>
            <LightTextInput
              placeholder={"Maker"}
              //@ts-ignore
              value={props.values.maker}
              onChangeText={props.handleChange("maker")}
              onBlur={props.handleBlur("maker")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.maker && props.errors.maker}
            </TextMontserrat>
            <LightTextInput
              placeholder={"Model"}
              //@ts-ignore
              value={props.values.model}
              onChangeText={props.handleChange("model")}
              onBlur={props.handleBlur("model")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.model && props.errors.model}
            </TextMontserrat>
            <LightTextInput
              placeholder={"Odometer"}
              //@ts-ignore
              value={props.values.odo}
              keyboardType={"numeric"}
              onChangeText={props.handleChange("odo")}
              onBlur={props.handleBlur("odo")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.odo && props.errors.odo}
            </TextMontserrat>
            <LightTextInput
              placeholder={"Plate"}
              //@ts-ignore
              value={props.values.plate}
              onChangeText={props.handleChange("plate")}
              onBlur={props.handleBlur("plate")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.plate && props.errors.plate}
            </TextMontserrat>
            <LightTextInput
              placeholder={"Vehicle Identification Number"}
              //@ts-ignore
              value={props.values.vin}
              onChangeText={props.handleChange("vin")}
              onBlur={props.handleBlur("vin")}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight={"semibold"}
            >
              {props.touched.vin && props.errors.vin}
            </TextMontserrat>

            <SquareButton title={"SUBMIT"} onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default AddVehicle