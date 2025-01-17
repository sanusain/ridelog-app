import React, {useContext, useState} from 'react'
import {Animated, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
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
import {RefuelLog, ServiceLog, VehicleInfo} from '../../Types'

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

  const getLifetimeRefullingCost = (rls: Array<RefuelLog>) => {
    let cost = 0
    rls.forEach((item: RefuelLog) => {
      cost += parseFloat(item.totalCost)
    })
    return cost
  }
  const getLifetimeServicingCost = (sls: Array<ServiceLog>) => {
    let cost = 0
    sls.forEach((item: ServiceLog) => {
      cost += parseFloat(item.totalCost)
    })
    return cost
  }

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
        {props.selectedVehicle ? (
          <Animated.View
            style={{
              height: callsignHeaderHeight,
              position: 'absolute',
              zIndex: 1,
              left: 0,
              right: 0,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: Colors.default_grey,
              margin: 15,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextOpenSans fontSize={20} style={{paddingTop: 10}}>
              Hello
            </TextOpenSans>
            <TextMontserrat fontSize={28} style={{paddingBottom: 10}}>
              {user?.callsign}
            </TextMontserrat>
          </Animated.View>
        ) : null}

        {!props.selectedVehicle ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="garage-open"
              size={200}
              color={Colors.spaceCadetPurple}
              style={{opacity: 0.56}}
            />

            <TextMontserrat
              fontSize={24}
              weight="medium"
              style={{
                textAlign: 'center',
                letterSpacing: 0.33,
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
              {`
Hey ${user?.callsign}
You need to add atleast one vehicle`}
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
              <View
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
                  marginBottom: 5,
                  marginTop: 10,
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
              </View>
              {props.selectedVehicle.refuelLogs?.length ? (
                <TouchableOpacity
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
                  }}
                  onPress={() => props.navigation.navigate('refuel')}>
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
                  </View>
                  <View style={{flex: 2, justifyContent: 'center'}}>
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
                        {
                          // @ts-ignore
                          props.selectedVehicle.refuelLogs[
                            // @ts-ignore
                            props.selectedVehicle.refuelLogs?.length - 1
                            // @ts-ignore
                          ].date.toDateString()
                        }
                      </TextOpenSans>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
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
                        <TextMontserrat
                          fontSize={18}
                          weight="semibold"
                          fontColor={Colors.imperialRed}>
                          ₹{' '}
                          {Math.trunc(
                            // @ts-ignore
                            props.selectedVehicle.refuelLogs[
                              // @ts-ignore
                              props.selectedVehicle.refuelLogs?.length - 1
                            ].totalCost,
                          )}
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
                          {Math.trunc(
                            // @ts-ignore
                            props.selectedVehicle.refuelLogs[
                              // @ts-ignore
                              props.selectedVehicle.refuelLogs?.length - 1
                            ].quantity,
                          )}{' '}
                          L
                        </TextMontserrat>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
              {props.selectedVehicle.serviceLogs?.length ? (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('service')}>
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
                          {
                            // @ts-ignore
                            props.selectedVehicle.serviceLogs[
                              // @ts-ignore
                              props.selectedVehicle.serviceLogs?.length - 1
                              // @ts-ignore
                            ].date.toDateString()
                          }
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
                          <TextMontserrat
                            fontSize={18}
                            weight="semibold"
                            fontColor={Colors.imperialRed}>
                            ₹{' '}
                            {
                              // @ts-ignore
                              props.selectedVehicle.serviceLogs[
                                // @ts-ignore
                                props.selectedVehicle.serviceLogs?.length - 1
                              ].totalCost
                            }
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
                            {
                              // @ts-ignore
                              props.selectedVehicle.serviceLogs[
                                // @ts-ignore
                                props.selectedVehicle.serviceLogs?.length - 1
                              ].serviceCount
                            }
                          </TextMontserrat>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
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
                      justifyContent: 'center',
                      marginVertical: 5,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        borderColor: Colors.imperialRed,
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TextMontserrat
                          fontSize={24}
                          weight="regular"
                          style={{marginTop: 5}}>
                          Refuel
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
                          ₹{' '}
                          {getLifetimeRefullingCost(
                            // @ts-ignore
                            props.selectedVehicle.refuelLogs,
                          )}
                        </TextOpenSans>
                      </View>
                    </View>
                    <View style={{width: 10}} />
                    <View
                      style={{
                        flex: 1,
                        borderColor: Colors.imperialRed,
                        borderWidth: 1,
                        borderRadius: 10,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TextMontserrat
                          fontSize={24}
                          weight="regular"
                          style={{marginTop: 5}}>
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
                          ₹{' '}
                          {getLifetimeServicingCost(
                            // @ts-ignore
                            props.selectedVehicle.serviceLogs,
                          )}
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
