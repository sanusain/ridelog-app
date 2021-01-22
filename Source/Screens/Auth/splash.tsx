import React from 'react'
import {Animated} from 'react-native'
import TextMontserrat from '../../Components/TextMontserrat'
import Colors from '../../Config/Colors'

// type Props = {navigation: any}

const Splash: React.FunctionComponent = (props) => {
  //   useEffect(() => {
  //     setTimeout(() => {
  //       props.navigation.navigate('')
  //     }, 800)
  //   }, [])

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextMontserrat
        fontColor={Colors.imperialRed}
        fontSize={28}
        weight="semibold"
        style={{
          letterSpacing: 5,
        }}>
        RIDELOGG
      </TextMontserrat>
    </Animated.View>
  )
}

export default Splash
