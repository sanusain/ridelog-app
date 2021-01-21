import React from 'react'
import {View} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SquareButton from '../../Components/SquareButton'
import Colors from '../../Config/Colors'

type Props = {navigation: any}

const GetStarted: React.FunctionComponent<Props> = (props: Props) => {
  const handleGetstarted = () => {
    console.log('handle getstarted')
    props.navigation.navigate('signIn')
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Onboarding
        bottomBarHighlight={false}
        showSkip={false}
        showNext={false}
        showDone={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <MaterialCommunityIcons
                name="clipboard-check-multiple-outline"
                size={150}
                color={Colors.spaceCadetPurple}
                style={{opacity: 0.8}}
              />
            ),
            title: 'Ridelogg',
            subtitle:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            subTitleStyles: {color: Colors.default_grey},
          },
          {
            backgroundColor: '#fff',
            image: (
              <FontAwesome5
                name="file-invoice-dollar"
                size={150}
                color={Colors.spaceCadetPurple}
                style={{opacity: 0.8}}
              />
            ),
            title: 'Placeholder',
            subtitle:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            subTitleStyles: {color: Colors.default_grey},
          },
        ]}
      />
      <SquareButton
        title="GET STARTED"
        style={{alignSelf: 'center', marginBottom: 20}}
        buttonBackgroundColor={Colors.imperialRed}
        onPress={handleGetstarted}
      />
    </View>
  )
}

export default GetStarted
