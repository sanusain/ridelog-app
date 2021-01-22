import React, {useContext, useState} from 'react'
import {Animated, View} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
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
import {VehicleInfo} from '../../Types'

type Props = {
  selectedVehicle: VehicleInfo
  navigation: DashboardNavigationProp
}

const DashBoard: React.FunctionComponent<Props> = (props: Props) => {
  const unit = 'KM'
  const {user} = useContext(AuthContext)
  const [scrollY] = useState(new Animated.Value(0))
  const headerMaxHeight = 200
  const headerMinHeight = 70

  const callsignHeaderHeight = scrollY.interpolate({
    inputRange: [0, headerMaxHeight - headerMinHeight],
    outputRange: [headerMaxHeight, headerMinHeight],
    extrapolate: 'clamp',
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <Animated.View
          style={{
            height: callsignHeaderHeight,
            position: 'absolute',
            zIndex: 1,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextOpenSans fontSize={20} style={{marginTop: 5}}>
            Hello
          </TextOpenSans>
          <TextMontserrat fontSize={28} style={{marginTop: 5}}>
            {user?.callsign}
          </TextMontserrat>
        </Animated.View>
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
          <View style={{paddingTop: 10}}>
            <Animated.ScrollView
              style={{
                marginVertical: 5,
                marginTop: callsignHeaderHeight,
                paddingTop: 5,
              }}
              scrollEventThrottle={8}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: false},
              )}>
              <Animated.View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingVertical: 15,
                  paddingHorizontal: 7,
                  borderRadius: 20,
                  zIndex: 10,
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderColor: Colors.imperialRed,
                  borderWidth: 1,
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
                <View>
                  <TextMontserrat fontSize={20} weight="medium">
                    Current Odometer
                  </TextMontserrat>
                  <TextOpenSans
                    fontSize={18}
                    fontColor={Colors.imperialRed}
                    style={{
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderColor: Colors.imperialRed,
                      borderWidth: 1,
                      borderRadius: 10,
                      marginVertical: 10,
                      alignSelf: 'center',
                    }}
                    weight="semibold">
                    {props.selectedVehicle.odo} {unit}
                  </TextOpenSans>
                </View>
              </Animated.View>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  zIndex: 100,
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderColor: Colors.imperialRed,
                  borderWidth: 1,
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
                  <TextMontserrat
                    fontSize={20}
                    weight="medium"
                    style={{alignSelf: 'center', margin: 2}}>
                    Last Refuel
                  </TextMontserrat>
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
                    <TextOpenSans
                      fontSize={20}
                      style={{
                        letterSpacing: 0.2,
                        alignSelf: 'center',
                        margin: 2,
                      }}>
                      {new Date().toDateString()}
                    </TextOpenSans>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: Colors.imperialRed,
                        borderWidth: 1,
                        borderRadius: 10,
                        margin: 2,
                      }}>
                      <MaterialCommunityIcons
                        name="currency-usd"
                        color={Colors.imperialRed}
                        size={25}
                      />
                      <TextMontserrat
                        fontSize={18}
                        weight="semibold"
                        fontColor={Colors.imperialRed}>
                        1000
                      </TextMontserrat>
                    </View>
                    <View style={{width: 10}} />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderColor: Colors.imperialRed,
                        borderWidth: 1,
                        borderRadius: 10,
                        margin: 2,
                        paddingVertical: 10,
                      }}>
                      <Feather
                        name="droplet"
                        color={Colors.imperialRed}
                        size={20}
                      />
                      <TextMontserrat
                        fontSize={18}
                        weight="semibold"
                        fontColor={Colors.imperialRed}>
                        2.8 L
                      </TextMontserrat>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flex: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    zIndex: 100,
                    marginHorizontal: 15,
                    marginVertical: 5,
                    borderWidth: 1,
                    borderColor: Colors.imperialRed,
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
                      <EvilIcons
                        name="gear"
                        color={Colors.default_red}
                        size={40}
                      />
                    </View>

                    <View style={{width: 28}} />
                  </View>

                  <View style={{flex: 2}}>
                    <TextMontserrat
                      fontSize={20}
                      weight="medium"
                      style={{alignSelf: 'center', margin: 2}}>
                      Last Service
                    </TextMontserrat>
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
                      <TextOpenSans
                        fontSize={20}
                        style={{
                          letterSpacing: 0.2,
                          alignSelf: 'center',
                          margin: 2,
                        }}>
                        {new Date().toDateString()}
                      </TextOpenSans>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 10,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: Colors.white,
                          borderColor: Colors.imperialRed,
                          borderWidth: 1,
                          borderRadius: 10,
                          margin: 2,
                        }}>
                        <MaterialCommunityIcons
                          name="currency-usd"
                          color={Colors.imperialRed}
                          size={25}
                        />
                        <TextMontserrat
                          fontSize={18}
                          weight="semibold"
                          fontColor={Colors.imperialRed}>
                          1000
                        </TextMontserrat>
                      </View>
                      <View style={{width: 10}} />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor: Colors.imperialRed,
                          borderRadius: 10,
                          margin: 2,
                          paddingVertical: 10,
                        }}>
                        <Feather
                          name="repeat"
                          color={Colors.imperialRed}
                          size={20}
                        />
                        <TextMontserrat
                          fontSize={18}
                          weight="semibold"
                          fontColor={Colors.imperialRed}
                          style={{marginLeft: 10}}>
                          2
                        </TextMontserrat>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <View
                  style={{
                    flex: 1,
                    borderColor: Colors.imperialRed,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginHorizontal: 15,
                    padding: 10,
                    marginBottom: 20,
                  }}>
                  <TextOpenSans
                    fontSize={18}
                    weight="semibold"
                    style={{padding: 10}}>
                    Lifetime Expense
                  </TextOpenSans>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-around',
                      marginVertical: 5,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        borderColor: Colors.imperialRed,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginHorizontal: 15,
                        padding: 15,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TextMontserrat fontSize={24} weight="regular">
                          Fuel
                        </TextMontserrat>
                        <TextOpenSans
                          fontSize={18}
                          fontColor={Colors.imperialRed}
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderColor: Colors.imperialRed,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginVertical: 10,
                          }}
                          weight="semibold">
                          $1000000
                        </TextOpenSans>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderColor: Colors.imperialRed,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginHorizontal: 15,
                        padding: 15,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TextMontserrat fontSize={24} weight="regular">
                          Service
                        </TextMontserrat>
                        <TextOpenSans
                          fontSize={18}
                          weight="semibold"
                          fontColor={Colors.imperialRed}
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderColor: Colors.imperialRed,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginVertical: 10,
                          }}>
                          $1000000
                        </TextOpenSans>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Animated.ScrollView>
          </View>
        )}
      </View>
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
