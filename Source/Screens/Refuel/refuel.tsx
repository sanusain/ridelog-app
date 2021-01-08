import React, {useEffect} from 'react'
import {Alert, View} from 'react-native'
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import ScreenHeader from '../../Components/Header'
import NoLog from '../../Components/NoData'
import TextMontserrat from '../../Components/TextMontserrat'
import TextOpenSans from '../../Components/TextOpenSans'
import Colors from '../../Config/Colors'
import {RefuelNavigationProps} from '../../Navigation/types'
import {AppState, dispatchHandler} from '../../State-management'
import {noop} from '../../Util'
import {RefuelData, VehicleInfo} from '../Dashboard/types'
import {ActionSetRefuelData} from './actions'

type Props = {
  selectedVehicle: VehicleInfo
  refuelData: Array<RefuelData>
  dispatch: any
  navigation: RefuelNavigationProps
}

const UserRefuelLog: React.FunctionComponent<Props> = (props: Props) => {
  const conversionLiquid = 'L'
  const conversionDistance = 'Km'
  const currency = '₹'

  useEffect(() => {
    // if (!props.refuelData.length) hydrateRefuelLogs(props.dispatch)
  }, [])

  const handleRefuelItem = (refuelLog: RefuelData) => {
    props.dispatch(new ActionSetRefuelData(refuelLog))
    props.navigation.navigate('refuelDetails')
  }

  const handleAddLog = () => {
    if (!props.selectedVehicle)
      return Alert.alert(
        'No vehicles',
        'Add a vehicle first',
        [{text: 'Ok', style: 'default'}],
        {cancelable: true},
      )

    return props.navigation.navigate('addRefuelLog')
  }

  const renderList = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          elevation: 1,
          borderRadius: 10,
          marginVertical: 5,
          paddingVertical: 10,
        }}
        onPress={() => handleRefuelItem(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <TextMontserrat fontSize={18} weight="medium">
            {new Date(item.date).toDateString()}
          </TextMontserrat>
          <TextMontserrat
            fontSize={18}
            weight="semibold"
            style={{color: Colors.imperialRed, opacity: 0.7}}>
            {currency} {item.cost}
          </TextMontserrat>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            paddingVertical: 2,
          }}>
          <TextOpenSans fontSize={16} style={{color: Colors.default_grey}}>
            Quantity {item.quantity} {conversionLiquid}
          </TextOpenSans>
          <TextOpenSans fontSize={16} style={{color: Colors.default_grey}}>
            {'   '}Odometer {item.odo} {conversionDistance}
          </TextOpenSans>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScreenHeader
        title="Refuel"
        enableAdd={!!props.refuelData?.length}
        enableCallback={props.refuelData?.length ? handleAddLog : noop}
      />
      <View style={{flex: 1, marginTop: -10}}>
        {props.refuelData && props.refuelData.length ? (
          <FlatList
            data={props.refuelData}
            renderItem={renderList}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <NoLog noLogType="noRefuelLog" handleOnPress={handleAddLog} />
        )}
      </View>
    </View>
  )
}
const mapStateToProps = (state: AppState) => ({
  selectedVehicle: state.vehicles[0],
  refuelData: state.selectedVehicle.refuelData,
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRefuelLog)
