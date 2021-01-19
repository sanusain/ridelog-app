import React, {useContext} from 'react'
import {Dimensions, Image, ScrollView, View} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {connect} from 'react-redux'
import SquareButton from '../../Components/SquareButton'
import TextMontserrat from '../../Components/TextMontserrat'
import TextOpenSans from '../../Components/TextOpenSans'
import Colors from '../../Config/Colors'
import {AuthContext} from '../../Contexts/AuthProvider'
import {DashboardNavigationProp} from '../../Navigation/types'
import {AppState, dispatchHandler} from '../../State-management'
import {} from '../../State-management/hydration/actions'
import {ImageSpecs} from '../Refuel/types'
import {VehicleInfo} from './types'

type Props = {
  selectedVehicle: VehicleInfo
  navigation: DashboardNavigationProp
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
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[Colors.softRed, Colors.paleRed]}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <View
          style={{
            height: 140,
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <TextMontserrat fontSize={20}>Hello,</TextMontserrat>
          <TextMontserrat fontSize={24} weight="bold">
            {user?.callsign}
          </TextMontserrat>
        </View>
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
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginVertical: 5}}>
            {/* <View>
            <Carousel
              data={Array.from(props.selectedVehicle.images)}
              renderItem={renderCarouselVehicle}
              sliderWidth={screenWidth}
              itemWidth={screenWidth / 1.2}
              loop
              autoplay
            />
          </View> */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 7,
                backgroundColor: Colors.paleRed,
                borderRadius: 20,
                zIndex: 10,
                marginHorizontal: 15,
                marginVertical: 5,
              }}>
              <View
                style={{
                  borderColor: Colors.default_grey,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 15,
                }}>
                <AntDesign
                  name="dashboard"
                  color={Colors.default_red}
                  size={40}
                />
              </View>
              <TextOpenSans fontSize={20}>Current Odometer</TextOpenSans>
              <TextOpenSans fontSize={20}>
                {props.selectedVehicle.odo}
              </TextOpenSans>
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 15,
                backgroundColor: Colors.paleRed,
                borderRadius: 20,
                zIndex: 100,
                marginHorizontal: 15,
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderColor: Colors.default_grey,
                    borderRadius: 10,
                    padding: 15,
                    borderWidth: 1,
                  }}>
                  <SimpleLineIcons
                    name="drop"
                    color={Colors.default_red}
                    size={40}
                  />
                </View>

                <View style={{width: 28}} />
              </View>

              <View style={{flex: 2}}>
                <TextOpenSans fontSize={20} style={{alignSelf: 'center'}}>
                  Last Refuel
                </TextOpenSans>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <Fontisto name="date" color={Colors.default_red} size={20} />
                  <TextOpenSans fontSize={20} style={{alignSelf: 'center'}}>
                    {new Date().toDateString()}
                  </TextOpenSans>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="currency-usd"
                      color={Colors.default_red}
                      size={25}
                    />
                    <TextMontserrat fontSize={18}>1000</TextMontserrat>
                  </View>
                  <View style={{borderWidth: 1, borderColor: Colors.tGrey}} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Feather
                      name="droplet"
                      color={Colors.default_red}
                      size={20}
                    />
                    <TextMontserrat fontSize={18}>2.8L</TextMontserrat>
                  </View>
                </View>
              </View>
            </View>

            {/* **************************fuel consumed in month */}

            <View style={{marginTop: 5}}>
              <LineChart
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May'],
                  datasets: [
                    {
                      data: [
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
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    flex: 1,
                    borderRadius: 10, // line radius
                  },
                }}
                bezier
                style={{
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  backgroundColor: Colors.paleRed,
                  borderRadius: 20,
                  zIndex: 100,
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      borderColor: Colors.default_grey,
                      borderRadius: 10,
                      padding: 15,
                      borderWidth: 1,
                    }}>
                    <AntDesign
                      name="tool"
                      color={Colors.default_red}
                      size={40}
                    />
                  </View>

                  <View style={{width: 28}} />
                </View>

                <View style={{flex: 2}}>
                  <TextOpenSans fontSize={20} style={{alignSelf: 'center'}}>
                    Last Service
                  </TextOpenSans>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Fontisto
                      name="date"
                      color={Colors.default_red}
                      size={20}
                    />
                    <TextOpenSans fontSize={20} style={{alignSelf: 'center'}}>
                      {new Date().toDateString()}
                    </TextOpenSans>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="currency-usd"
                        color={Colors.default_red}
                        size={25}
                      />
                      <TextMontserrat fontSize={18}>1000</TextMontserrat>
                    </View>
                    <View style={{borderWidth: 1, borderColor: Colors.tGrey}} />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Feather
                        name="repeat"
                        color={Colors.default_red}
                        size={20}
                      />
                      <TextMontserrat fontSize={18}>2</TextMontserrat>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 5}}>
              {/* a pie chart representing aggregate expenses in fuel and services from beginning */}
              <LineChart
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May'],
                  datasets: [
                    {
                      data: [
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
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    flex: 1,
                    borderRadius: 10, // line radius
                  },
                }}
                bezier
                style={{
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </LinearGradient>
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
