import React from 'react'
import {SafeAreaView as SafeView} from 'react-native'

type Props = {children: any}

const SafeAreaView: React.FunctionComponent<Props> = (props) => {
  return (
    <SafeView
      style={{
        flex: 1,
      }}>
      {props.children}
    </SafeView>
  )
}

export default SafeAreaView
