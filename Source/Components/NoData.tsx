import React from 'react'
import {View} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../Config/Colors'
import SquareButton from './SquareButton'
import TextMontserrat from './TextMontserrat'
import TextOpenSans from './TextOpenSans'

type noLogType = 'noRefuelLog' | 'noServiceLog' | 'NoVehicles'

type Props = {noLogType: noLogType; handleOnPress: () => void}

const NoLog: React.FunctionComponent<Props> = (props: Props) => {
  const size = 100
  const color = Colors.imperialRed
  const style = {opacity: 0.33}

  const getNoLogIcon = (logType: string) => {
    switch (logType) {
      case 'noRefuelLog':
        return (
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={size}
            color={color}
            style={style}
          />
        )
      case 'noServiceLog':
        return (
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={size}
            color={color}
            style={style}
          />
        )
      default:
        return null
    }
  }

  const getNoLogText = (logType: string): [string, string] => {
    switch (logType) {
      case 'noRefuelLog':
        return [
          'No Refuel Logs',
          'Press Add log to add a new fuel log for your current vehicle',
        ]
      case 'noServiceLog':
        return [
          'No Service Logs',
          'Press Add log to add a new service log for your current vehicle',
        ]
      default:
        return ['default', 'default']
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {getNoLogIcon(props.noLogType)}
      <View style={{alignItems: 'center'}}>
        <TextMontserrat fontSize={20} style={{marginTop: 10}} weight="medium">
          {getNoLogText(props.noLogType)[0]}
        </TextMontserrat>
        <TextOpenSans
          fontSize={18}
          fontColor={Colors.default_grey}
          style={{textAlign: 'center', padding: 20}}>
          {getNoLogText(props.noLogType)[1]}
        </TextOpenSans>
      </View>
      <SquareButton
        title="ADD LOG"
        onPress={props.handleOnPress}
        buttonBackgroundColor={Colors.imperialRed}
        style={{
          position: 'absolute',
          // left: 0,
          // right: 0,
          bottom: 30,
          width: '60%',
        }}
      />
    </View>
  )
}

export default NoLog
