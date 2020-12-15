import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {dispatchHandler} from '../../State-management'

type Props = {}

const userServiceLog: React.FunctionComponent<Props> = () => {
  return (
    <View style={{flex: 1}}>
      <Text>SERVICE LOG</Text>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(null, mapDispatchToProps)(userServiceLog)
