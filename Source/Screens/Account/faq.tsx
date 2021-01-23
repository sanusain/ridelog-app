import React from 'react'
import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import ScreenHeader from '../../Components/Header'
import QuestionBox from '../../Components/QuestionBox'
import Colors from '../../Config/Colors'
import {FaqNavigationProps} from '../../Navigation/types'

type Props = {navigation: FaqNavigationProps}

const Faq: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScreenHeader title="FAQs" enableBack />
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <QuestionBox
          question="What is Ridelogg-alpha ?"
          answer={`Ridelogg is a mobile application aimed to help vehicle owners keep their vehicle maintenance logs and keep a track of their vehicle maintenance charges `}
        />
        <QuestionBox
          question={`What does the "alpha" mean ? `}
          answer={`The alpha signifies that the current application is not fully ready and may contain bugs which will be resolved in the upcoming updates. `}
        />
        <QuestionBox
          question={`Is the application free to use? `}
          answer={`Partially, For single vehicle maintainance logging the app is free to use. `}
        />
      </ScrollView>
    </View>
  )
}

export default Faq
