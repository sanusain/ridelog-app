import React from 'react'
import {Alert, View} from 'react-native'
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import ScreenHeader from '../../Components/Header'
import NoLog from '../../Components/NoData'
import TextMontserrat from '../../Components/TextMontserrat'
import TextOpenSans from '../../Components/TextOpenSans'
import Colors from '../../Config/Colors'
import {ServiceNavigationProps} from '../../Navigation/types'
import {AppState, dispatchHandler} from '../../State-management'
import {ServiceLog, VehicleInfo} from '../../Types'
import {noop} from '../../Util'
import {ActionSetServiceData} from './actions'

type Props = {
  selectedVehicle: VehicleInfo
  dispatch: any
  navigation: ServiceNavigationProps
}

const ServiceLogScreen: React.FunctionComponent<Props> = (props: Props) => {
  const conversionLiquid = 'L'
  const conversionDistance = 'Km'
  const currency = '₹'

  const handleServiceItem = (serviceLog: ServiceLog) => {
    props.dispatch(new ActionSetServiceData(serviceLog))
    props.navigation.navigate('serviceDetails')
  }

  const handleAddLog = () => {
    if (!props.selectedVehicle)
      return Alert.alert(
        'No vehicles',
        'Add a vehicle first',
        [{text: 'Ok', style: 'default'}],
        {cancelable: true},
      )

    return props.navigation.navigate('addServiceLog')
  }

  const renderList = ({item}: {item: ServiceLog}) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          // elevation: 1,
          borderWidth: 1,
          borderColor: Colors.default_grey,
          borderRadius: 10,
          marginVertical: 5,
          paddingVertical: 5,
        }}
        onPress={() => handleServiceItem(item)}>
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
            Service # {item.serviceCount}
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
        title="Service"
        enableAdd={!!props.selectedVehicle?.serviceLogs?.length}
        enableCallback={
          props.selectedVehicle?.serviceLogs?.length ? handleAddLog : noop
        }
      />
      <View style={{flex: 1, marginTop: -10}}>
        {props.selectedVehicle?.serviceLogs?.length ? (
          <FlatList
            data={props.selectedVehicle?.serviceLogs}
            renderItem={renderList}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <NoLog noLogType="noServiceLog" handleOnPress={handleAddLog} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceLogScreen)
