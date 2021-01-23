import React from 'react'
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
import {RefuelLog, VehicleInfo} from '../../Types'
import {noop} from '../../Util'
import {ActionSetRefuelData} from './actions'

type Props = {
  selectedVehicle: VehicleInfo
  dispatch: any
  navigation: RefuelNavigationProps
}

const UserRefuelLog: React.FunctionComponent<Props> = (props: Props) => {
  const conversionLiquid = 'L'
  const conversionDistance = 'Km'
  const currency = '₹'

  const handleRefuelItem = (refuelLog: RefuelLog) => {
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

  const renderList = ({item}: {item: RefuelLog}) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: Colors.default_grey,
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
            {currency} {item.totalCost}
          </TextMontserrat>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            paddingVertical: 5,
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
    // <View style={{flex: 1, backgroundColor: Colors.white}}>
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
      // colors={[Colors.softRed, Colors.paleRed]}
    >
      <ScreenHeader
        title="Refuel"
        enableAdd={!!props.selectedVehicle?.refuelLogs?.length}
        enableCallback={
          props.selectedVehicle?.refuelLogs?.length ? handleAddLog : noop
        }
      />
      <View style={{flex: 1, marginTop: -10}}>
        {props.selectedVehicle?.refuelLogs?.length ? (
          <FlatList
            data={props.selectedVehicle?.refuelLogs}
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
})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRefuelLog)
