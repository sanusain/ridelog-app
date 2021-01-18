import React, {FunctionComponent, useContext, useState} from 'react'
import {Dimensions, Image, Modal, TouchableOpacity, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Carousel from 'react-native-snap-carousel'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'
import ScreenHeader from '../../Components/Header'
import ImageView from '../../Components/ImageView'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import Colors from '../../Config/Colors'
import {AuthContext} from '../../Contexts/AuthProvider'
import {removeRefuelLogFromDb} from '../../Database/jobs'
import {RefuelDetailsNavigationProps} from '../../Navigation/types'
import {AppState, dispatchHandler} from '../../State-management'
import {RefuelLog} from '../Dashboard/types'
import {
  ActionResetImageViewInitialIndex,
  ActionSetImageViewInitialIndex,
} from './actions'

type Props = {
  dispatch: any
  refuelLog: RefuelLog
  navigation: RefuelDetailsNavigationProps
}

const screenWidth = Dimensions.get('window').width

const RefuelDetails: FunctionComponent<Props> = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const {user} = useContext(AuthContext)
  const images = props.refuelLog.images.filter((image) => image != null)

  const closeModal = () => {
    props.dispatch(new ActionResetImageViewInitialIndex())
    setModalVisible(false)
  }

  const deleteLog = async () => {
    removeRefuelLogFromDb(props.refuelLog)
    props.navigation.goBack()
  }

  const renderCarousel = ({item}: {item: any}) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flex: 1,
            marginHorizontal: 10,
            borderRadius: 5,
            overflow: 'hidden',
          }}
          onPress={() => {
            setModalVisible(true)
          }}>
          <Image
            source={{uri: item}}
            resizeMode="cover"
            style={{
              borderWidth: 1,
              width: screenWidth,
              height: (3 / 4) * (screenWidth / 1.5),
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return modalVisible ? (
    <Modal visible={modalVisible} onRequestClose={closeModal}>
      <View style={{flex: 1}}>
        <ImageView images={images} />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
          }}
          onPress={closeModal}>
          <AntDesign name="close" size={40} color={Colors.default_grey} />
        </TouchableOpacity>
      </View>
    </Modal>
  ) : (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          backgroundColor: Colors.white,
        }}>
        <ScreenHeader title="Refuel Details" enableBack />
        <Carousel
          data={images}
          renderItem={renderCarousel}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={(index) => {
            props.dispatch(new ActionSetImageViewInitialIndex(index))
          }}
          showsHorizontalScrollIndicator
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.manateeGrey,
            paddingVertical: 5,
            flex: 1,
            borderRadius: 5,
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="date-range"
                size={30}
                color={Colors.imperialRed}
              />
              <TextMontserrat fontSize={18} style={{marginLeft: 10}}>
                Date
              </TextMontserrat>
            </View>
            <View>
              <TextMontserrat fontSize={18}>
                {new Date(props.refuelLog.date).toDateString()}
              </TextMontserrat>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign
                name="dashboard"
                size={30}
                color={Colors.imperialRed}
              />
              <TextMontserrat fontSize={18} style={{marginLeft: 10}}>
                Odometer
              </TextMontserrat>
            </View>
            <View>
              <TextMontserrat fontSize={18}>
                {props.refuelLog.odo}
              </TextMontserrat>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome
                name="sitemap"
                size={30}
                color={Colors.imperialRed}
              />
              <TextMontserrat fontSize={18} style={{marginLeft: 10}}>
                Quantity
              </TextMontserrat>
            </View>
            <View>
              <TextMontserrat fontSize={18}>
                {props.refuelLog.quantity}
              </TextMontserrat>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="dollar-sign"
                size={30}
                color={Colors.imperialRed}
              />
              <TextMontserrat fontSize={18} style={{marginLeft: 10}}>
                Price/L
              </TextMontserrat>
            </View>
            <View>
              <TextMontserrat fontSize={18}>
                {props.refuelLog.unitCost}
              </TextMontserrat>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="md-pricetags"
                size={30}
                color={Colors.imperialRed}
              />
              <TextMontserrat fontSize={18} style={{marginLeft: 10}}>
                Cost
              </TextMontserrat>
            </View>
            <View>
              <TextMontserrat fontSize={18}>
                {props.refuelLog.totalCost}
              </TextMontserrat>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="location-on"
                size={30}
                color={Colors.imperialRed}
              />
              <TextMontserrat fontSize={18} style={{marginLeft: 10}}>
                Location
              </TextMontserrat>
            </View>
            <View>
              <TextMontserrat fontSize={18}>
                {props.refuelLog.location}
              </TextMontserrat>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: Colors.white,
          marginBottom: 10,
        }}>
        <SquareButton
          title="DELETE LOG"
          buttonBackgroundColor={Colors.redLite}
          style={{alignSelf: 'center', width: '95%'}}
          onPress={deleteLog}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({
  refuelLog: state.refuel.refuelLog,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(RefuelDetails)
