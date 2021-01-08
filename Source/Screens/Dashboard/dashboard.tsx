import React, {useContext} from 'react'
import {Alert, Dimensions, Image, ScrollView, View} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Carousel from 'react-native-snap-carousel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import ScreenHeader from '../../Components/Header'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import Colors from '../../Config/Colors'
import {AuthContext} from '../../Contexts/AuthProvider'
import {removeVehicleFromDb} from '../../Database/jobs'
import {
  DashboardNavigationProp,
  DashboardRouteProp,
} from '../../Navigation/types'
import {AppState, dispatchHandler} from '../../State-management'
import {} from '../../State-management/hydration/actions'
import {ImageSpecs} from '../Refuel/types'
import {VehicleInfo} from './types'

type Props = {
  selectedVehicle: VehicleInfo
  navigation: DashboardNavigationProp
  dispatch: any
  route: DashboardRouteProp
}

const DashBoard: React.FunctionComponent<Props> = (props: Props) => {
  const screenWidth = Dimensions.get('window').width
  const {user} = useContext(AuthContext)

  const renderCarouselVehicle = ({item}: {item: ImageSpecs}) => {
    return (
      <View style={{height: 0.5 * screenWidth}}>
        <Image
          resizeMode="cover"
          source={{uri: item.url}}
          style={{borderRadius: 10, width: '100%', height: '100%'}}
        />
      </View>
    )
  }

  const renderCarouselTips = ({item}: {item: ImageSpecs}) => {
    return (
      <View style={{height: 60}}>
        <Image
          resizeMode="cover"
          source={{uri: item.url}}
          style={{borderRadius: 5, width: '100%', height: '100%'}}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: Colors.white,
      }}>
      <ScreenHeader
        title={`Welcome, ${user?.callsign}`}
        enableAdd
        enableCallback={() => {
          props.navigation.navigate('addVehicle')
        }}
      />
      <View
        style={{
          marginTop: -10,
          marginBottom: 10,
          borderTopWidth: 1, // intentional
          borderColor: Colors.imperialRed, // intentional
          marginRight: 100,
        }}
      />
      {!props.selectedVehicle ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <MaterialCommunityIcons
            name="garage-open"
            size={200}
            color={Colors.spaceCadetPurple}
            style={{opacity: 0.56}}
          />

          <TextMontserrat
            fontSize={24}
            weight="semibold"
            style={{
              textAlign: 'center',
              color: Colors.default_grey,
            }}>
            Empty Garage
          </TextMontserrat>
          <TextMontserrat
            fontSize={18}
            style={{
              textAlign: 'center',
              paddingHorizontal: 50,
              marginTop: 10,
              letterSpacing: 0.8,
              color: Colors.default_grey,
            }}>
            Your Garage is empty, Add a vehicle and give it a purpose
          </TextMontserrat>
          <SquareButton
            title="ADD VEHICLE"
            buttonBackgroundColor={Colors.imperialRed}
            onPress={() => props.navigation.navigate('addVehicle')}
            width="50%"
            style={{opacity: 0.87, marginTop: 40}}
          />
          <SquareButton
            title="sync"
            onPress={() => {
              console.log('pressed sync')
              props.dispatch(new ActionSetFetchingVehicle())
              // startSync()
            }}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginVertical: 5}}>
          <View>
            <Carousel
              data={Array.from(props.selectedVehicle.images)}
              renderItem={renderCarouselVehicle}
              sliderWidth={screenWidth}
              itemWidth={screenWidth / 1.2}
              loop
              autoplay
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.inputBackGroundWhite,
              marginTop: 10,
              marginHorizontal: 8,
              padding: 10,
              borderRadius: 8,
              elevation: 5,
            }}
            onPress={() => {
              console.log('Remove ride')
              Alert.alert(
                'Remove this vehicle?',
                `${props.selectedVehicle.vcallsign} will be deleted`,
                [
                  {
                    text: 'Delete',
                    onPress: () => removeVehicleFromDb(props.selectedVehicle),
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              )
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
                alignItems: 'center',
              }}>
              <TextMontserrat fontSize={16} weight="medium">
                Ride
              </TextMontserrat>
              <TextMontserrat fontSize={16} weight="medium">
                {props.selectedVehicle.vcallsign}
              </TextMontserrat>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
                alignItems: 'center',
              }}>
              <TextMontserrat fontSize={16} weight="medium">
                Current Odometer
              </TextMontserrat>
              <TextMontserrat fontSize={16} weight="medium">
                {props.selectedVehicle.odo} KMs
              </TextMontserrat>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
                alignItems: 'center',
              }}>
              <TextMontserrat fontSize={16} weight="medium">
                Last Refuel
              </TextMontserrat>
              <TextMontserrat fontSize={16} weight="medium">
                {new Date().toDateString()}
              </TextMontserrat>
            </View>
          </TouchableOpacity>

          {/* **************************fuel consumed in month */}
          <View style={{alignItems: 'center', marginTop: 10}}>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={screenWidth - 10}
              height={220}
              yAxisSuffix="L"
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Carousel
              data={Array.from(props.selectedVehicle.images)}
              renderItem={renderCarouselTips}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 10}
              loop
              autoplay
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const mapStateToProps = (state: AppState) => {
  console.log('selected vehicle', state.vehicles[0])

  return {
    fetchVehicle: state.misc.fetchingVehicle,
    // selectedVehicle: state.selectedVehicle,
    selectedVehicle: state.vehicles[0],
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
