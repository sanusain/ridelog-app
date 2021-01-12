/* eslint-disable radix */
import DateTimePicker from '@react-native-community/datetimepicker'
import ObjectID from 'bson-objectid'
// import {firestore} from 'firebase'
import LottieView from 'lottie-react-native'
import React, {createRef, FunctionComponent, useEffect, useState} from 'react'
import {Animated, Keyboard, Modal, ScrollView, View} from 'react-native'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-crop-picker'
import {TextInput} from 'react-native-paper'
import * as Progress from 'react-native-progress'
import {connect} from 'react-redux'
import BottomSheet from 'reanimated-bottom-sheet'
import {uploadRefuelLog} from '../../api/refuel'
import ScreenHeader from '../../Components/Header'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import TextOpenSans from '../../Components/TextOpenSans'
import Colors from '../../Config/Colors'
import {addRefuelLogToDb} from '../../Database/jobs'
import {AddRefuelLogNavigationProps} from '../../Navigation/types'
import {AppState, dispatchHandler} from '../../State-management'
import {RefuelLog, VehicleInfo} from '../Dashboard/types'
import {
  ActionAddImage,
  ActionResetImages,
  ActionSetCloudOperationStatus,
} from './actions'
import {ImageSpecs} from './types'

type Props = {
  navigation: AddRefuelLogNavigationProps
  refuelLogImages: Array<ImageSpecs>
  selectedVehicle: VehicleInfo
  imageUploadProgress: number
  dispatch: any
}

const AddRefuelLog: FunctionComponent<Props> = (props: Props) => {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('undefined')
  const [show, setShow] = useState(false)
  const [currentOdo, setCurrentOdo] = useState('')
  const [odoError, setOdoError] = useState(false)
  const [lastOdo, setLastOdo] = useState('')
  const [fuelQuantity, setFuelQuantity] = useState('')
  const [unitCost, setUnitCost] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [location, setLocation] = useState('')
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const bottomSheetRef: React.RefObject<BottomSheet> = createRef()
  const [animatedOpacity] = useState(new Animated.Value(1))

  useEffect(() => {
    setLastOdo(props.selectedVehicle.odo)
    return () => {
      props.dispatch(new ActionResetImages())
    }
  }, [])

  const updateCost = () => {
    const fuelCost = (parseFloat(fuelQuantity) * parseFloat(unitCost)).toFixed(
      2,
    )
    if (fuelCost !== 'NaN') setTotalCost(fuelCost)
    else setTotalCost('')
  }

  const setBackgroundOpacity = (type: boolean) => {
    if (type) {
      Animated.timing(animatedOpacity, {
        toValue: 0.3, // sets opacity
        duration: 100,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 1, // removes opacity
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
    showMode('date')
  }

  const showMode = (type: string) => {
    setMode(type)
    setShow(true)
  }

  const onChangeDate = (event: any, selectedDate: Date) => {
    setShow(false)
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  const handleSubmitLog = async () => {
    const refuelData: RefuelLog = {
      _id: new ObjectID().str,
      vehicleId: props.selectedVehicle._id,
      odo: currentOdo,
      date: date.toISOString(),
      unitCost,
      quantity: fuelQuantity,
      totalCost,
      location,
      images: props.refuelLogImages.length ? props.refuelLogImages : [],
    }
    await addRefuelLogToDb(refuelData)
    props.dispatch(new ActionSetCloudOperationStatus(true))
    await uploadRefuelLog(refuelData)
    props.dispatch(new ActionSetCloudOperationStatus(false))
    props.navigation.navigate('refuel')
  }

  const handleTakePicture = async () => {
    hideBottomSheet()
    ImagePicker.openCamera({
      compressImageQuality: 0.7,
      cropping: true,
    })
      .then((img) => {
        const image: ImageSpecs = {
          _id: new ObjectID().str,
          height: img.height,
          width: img.width,
          url: img.path,
        }
        props.dispatch(new ActionAddImage(image))
        console.log(image)
      })
      .catch((error) => {
        console.info('ERROR_SNAPPING_IMG', error)
      })
  }

  const handleFromGallery = async () => {
    hideBottomSheet()
    ImagePicker.openPicker({
      compressImageQuality: 0.7,
      cropping: true,
    })
      .then((img) => {
        console.log(img)
        const image: ImageSpecs = {
          _id: new ObjectID().str,
          height: img.height,
          width: img.width,
          url: img.path,
        }
        props.dispatch(new ActionAddImage(image))
      })
      .catch((error) => {
        console.info('ERROR_PICKING_IMG', error)
      })
  }

  const renderBottomSheetContent = () => (
    <View
      style={{
        backgroundColor: Colors.white,
        elevation: 5,
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 3,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderRadius: 10,
        borderTopColor: Colors.default_grey,
        borderRightColor: Colors.white,
        borderLeftColor: Colors.white,
      }}>
      <View // horizontal artifact
        style={{
          borderWidth: 3,
          width: '10%',
          alignSelf: 'center',
          borderRadius: 5,
          marginBottom: 20,
          borderColor: Colors.default_grey,
          opacity: 0.5,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <TextMontserrat fontSize={24}>Choose Image</TextMontserrat>
        <TextMontserrat fontSize={16}>
          Pick an image from gallery or using camera
        </TextMontserrat>
      </View>

      <View
        style={{
          marginTop: 20,
          paddingHorizontal: '10%',
        }}>
        <TouchableWithoutFeedback
          onPress={handleTakePicture}
          style={{alignItems: 'center'}}>
          <SquareButton
            title="Take Picture"
            buttonBackgroundColor={Colors.imperialRed}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={handleFromGallery}
          style={{alignItems: 'center', marginVertical: 10}}>
          <SquareButton
            title="Choose from Gallery"
            buttonBackgroundColor={Colors.imperialRed}
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            hideBottomSheet()
          }}
          style={{marginTop: 10, marginBottom: 20, alignItems: 'center'}}>
          <TextOpenSans
            fontSize={18}
            weight="semibold"
            style={{color: Colors.imperialRed}}>
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
      contentContainerStyle={{flexGrow: 1}}>
      <Modal visible={modalOpen} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            {props.imageUploadProgress < 100 ? (
              <Progress.Bar
                color={Colors.redLite}
                progress={props.imageUploadProgress / 100}
                width={200}
                useNativeDriver
                animationType="spring"
              />
            ) : (
              <View>
                <LottieView
                  source={require('../../Assets/Animations/done.json')}
                  loop={false}
                  autoPlay
                  style={{width: 300}}
                  onAnimationFinish={() => {
                    setModalOpen(false)
                    props.navigation.navigate('refuel')
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%', '0%']}
        renderContent={renderBottomSheetContent}
        enabledGestureInteraction
        initialSnap={1}
        enabledInnerScrolling={false}
        enabledBottomClamp
        onOpenEnd={() => {
          setBackgroundOpacity(true)
        }}
        onCloseEnd={() => {
          hideBottomSheet()
        }}
      />
      <ScreenHeader title="Refuel Log" enableBack />
      <Animated.View
        style={{marginTop: -10, opacity: animatedOpacity}}
        pointerEvents={isBottomSheetOpen ? 'none' : undefined}>
        <TextInput
          label="Date and Time"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          value={date.toDateString()}
          onFocus={handleShowDateDialog}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // @ts-ignore
            mode={mode}
            is24Hour
            display="default"
            // @ts-ignore
            onChange={onChangeDate}
          />
        )}
        <TextInput
          label="Current Odometer"
          error={odoError}
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          keyboardType="number-pad"
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          value={currentOdo}
          onChangeText={(inputText) => {
            setCurrentOdo(inputText)
          }}
          onBlur={() => {
            if (
              !parseInt(currentOdo) ||
              parseInt(currentOdo) < parseInt(lastOdo)
            )
              setOdoError(true)
            else setOdoError(false)
          }}
        />
        {odoError ? (
          <TextMontserrat
            fontSize={16}
            weight="semibold"
            fontColor={Colors.imperialRed}
            style={{alignSelf: 'center'}}>
            Current reading is less than Last reading
          </TextMontserrat>
        ) : (
          <View />
        )}
        <TextInput
          label="Last Odometer"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          value={lastOdo}
          editable={false}
        />
        <TextInput
          label="Fuel Quantity"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          keyboardType="number-pad"
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          value={fuelQuantity}
          onChangeText={(inputText) => {
            setFuelQuantity(inputText)
          }}
          onEndEditing={updateCost}
        />
        <TextInput
          label="Price/L"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          keyboardType="number-pad"
          value={unitCost}
          onChangeText={(inputText) => {
            setUnitCost(inputText)
          }}
          onEndEditing={updateCost}
        />
        <TextInput
          label="Cost"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          value={totalCost}
          editable={false}
        />
        <TextInput
          label="Location"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginVertical: 5,
          }}
          theme={{
            colors: {primary: Colors.imperialRed, background: Colors.white},
          }}
          value={location}
          onChangeText={(inputText) => {
            setLocation(inputText)
          }}
        />
        {/* <CustomImagePicker
          handleImagePress={(image: ImageSpecs) => {
            props.dispatch(new ActionRemoveRefuelLogImage(image))
          }}
          handlePlaceHolderImagePress={() => {
            setIsBottomSheetOpen(true)
            bottomSheetRef.current?.snapTo(0)
          }}
        /> */}

        <SquareButton
          title="ADD LOG"
          onPress={handleSubmitLog}
          buttonBackgroundColor={Colors.imperialRed}
          style={{
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 20,
          }}
          // disabled={!!(!currentOdo || !fuelQuantity || !pricePerQty)}
        />
      </Animated.View>
    </ScrollView>
  )
}

const mapStateToProps = (state: AppState) => ({
  refuelLogImages: state.refuel.addRefuelLog.images,
  selectedVehicle: state.vehicles[0],
  // selectedVehicle: state.selectedVehicle,
  imageUploadProgress: state.misc.imageUploadProgress,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRefuelLog)
