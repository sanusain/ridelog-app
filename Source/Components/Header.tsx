import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Config/Colors'
import {noop} from '../Util'
import TextMontserrat from './TextMontserrat'

type Props = {
  title: string
  enableDone?: boolean
  enableAdd?: boolean
  enableBack?: boolean
  enableCallback?: () => void
}

const ScreenHeader: React.FunctionComponent<Props> = (props: Props) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
      }}>
      {props.enableBack ? (
        <TouchableOpacity
          style={{padding: 10, justifyContent: 'center'}}
          onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={25} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 25}} />
      )}

      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextMontserrat
          fontSize={16}
          style={{alignSelf: 'center'}}
          weight="semibold">
          {props.title}
        </TextMontserrat>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', padding: 10}}
        onPress={
          props.enableAdd || props.enableDone ? props.enableCallback : noop
        }>
        {props.enableAdd || props.enableDone ? (
          props.enableAdd ? (
            <Ionicons name="ios-add" size={30} color={Colors.imperialRed} />
          ) : (
            <MaterialIcons name="done" size={30} color={Colors.imperialRed} />
          )
        ) : (
          <View style={{width: 25}} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default ScreenHeader
