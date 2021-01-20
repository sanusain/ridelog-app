import ObjectID from 'bson-objectid'
import {Formik} from 'formik'
import React, {useContext} from 'react'
import {Alert, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import * as yup from 'yup'
import ScreenHeader from '../../Components/Header'
import LightTextInput from '../../Components/LightTextInput'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import Colors from '../../Config/Colors'
import {AuthContext} from '../../Contexts/AuthProvider'
import {AddVehicleNavigationProp} from '../../Navigation/types'
import {VehicleInfo} from '../../Types'
import {addVehicleToDb} from './job'

type Props = {
  navigation: AddVehicleNavigationProp
}

const addVehicleSchema = yup.object({
  vcallsign: yup
    .string()
    .required('Your vehicle needs a short callsign')
    .min(2)
    .max(10),
  year: yup.string().required('Please enter a valid year').max(4),
  maker: yup.string().required(),
  model: yup.string().required(),
  odo: yup.string().required(),
  plate: yup.string(),
  vin: yup.string(),
})

const AddVehicle: React.FunctionComponent<Props> = (props: Props) => {
  const {user} = useContext(AuthContext)

  const handleSubmit = async (inputValues: {
    vcallsign: string
    year: string
    maker: string
    model: string
    odo: string
    plate: string
    vin: string
  }) => {
    const validatedInputData: VehicleInfo = {
      _id: new ObjectID().str,
      vcallsign: inputValues.vcallsign,
      year: inputValues.year,
      maker: inputValues.maker,
      model: inputValues.model,
      odo: inputValues.odo,
      plate: inputValues.plate,
      vin: inputValues.vin,
      images: [
        {
          _id: new ObjectID().str,
          url:
            'https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg',
          height: 1200,
          width: 600,
        },
        {
          _id: new ObjectID().str,
          url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png',
          height: 1200,
          width: 600,
        },
        {
          _id: new ObjectID().str,
          url:
            'https://stat.overdrive.in/wp-content/odgallery/2018/05/42109_Kawasaki-Ninja-H2R_009.jpg',
          height: 1200,
          width: 600,
        },
        {
          _id: new ObjectID().str,
          url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png',
          height: 1200,
          width: 600,
        },
        {
          _id: new ObjectID().str,
          url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/330px-BMW.svg.png',
          height: 1200,
          width: 600,
        },
      ],
    }

    const isVehicleAdded = await addVehicleToDb(validatedInputData)
    console.log('isVehicleAdded', isVehicleAdded)
    if (isVehicleAdded)
      return Alert.alert(
        'New vehicle added',
        '',
        [{text: 'Ok', onPress: () => props.navigation.goBack()}],
        {cancelable: true},
      )
    return Alert.alert('vehicle Not added', '', [], {cancelable: true})
  }

  return (
    <ScrollView
      style={{
        width: '100%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
      }}>
      <ScreenHeader title="Add New Vehicle" enableBack />
      <Formik
        initialValues={{
          vcallsign: 'myvehicle',
          year: '2020',
          maker: 'ghost',
          model: 'phantom',
          odo: '2300',
          plate: 'dontpanick',
          vin: 'afdsafadf32423',
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values)
          // actions.resetForm()
        }}
        validationSchema={addVehicleSchema}>
        {(prop) => (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <LightTextInput
              placeholder="Vehicle Callsign"
              // @ts-ignore
              value={prop.values.vcallsign}
              onChangeText={prop.handleChange('vcallsign')}
              OnBlur={prop.handleBlur('vcallsign')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.vcallsign && prop.errors.vcallsign}
            </TextMontserrat>
            <LightTextInput
              placeholder="Year"
              // @ts-ignore
              value={prop.values.year}
              keyboardType="numeric"
              onChangeText={prop.handleChange('year')}
              onBlur={prop.handleBlur('year')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.year && prop.errors.year}
            </TextMontserrat>
            <LightTextInput
              placeholder="Maker"
              // @ts-ignore
              value={prop.values.maker}
              onChangeText={prop.handleChange('maker')}
              onBlur={prop.handleBlur('maker')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.maker && prop.errors.maker}
            </TextMontserrat>
            <LightTextInput
              placeholder="Model"
              // @ts-ignore
              value={prop.values.model}
              onChangeText={prop.handleChange('model')}
              onBlur={prop.handleBlur('model')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.model && prop.errors.model}
            </TextMontserrat>
            <LightTextInput
              placeholder="Odometer"
              // @ts-ignore
              value={prop.values.odo}
              keyboardType="numeric"
              onChangeText={prop.handleChange('odo')}
              onBlur={prop.handleBlur('odo')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.odo && prop.errors.odo}
            </TextMontserrat>
            <LightTextInput
              placeholder="Plate"
              // @ts-ignore
              value={prop.values.plate}
              onChangeText={prop.handleChange('plate')}
              onBlur={prop.handleBlur('plate')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.plate && prop.errors.plate}
            </TextMontserrat>
            <LightTextInput
              placeholder="Vehicle Identification Number"
              // @ts-ignore
              value={prop.values.vin}
              onChangeText={prop.handleChange('vin')}
              onBlur={prop.handleBlur('vin')}
            />
            <TextMontserrat
              fontSize={16}
              style={{
                color: Colors.imperialRed,
                opacity: 0.67,
                marginVertical: 6,
              }}
              weight="semibold">
              {prop.touched.vin && prop.errors.vin}
            </TextMontserrat>

            <SquareButton title="SUBMIT" onPress={prop.handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default AddVehicle
