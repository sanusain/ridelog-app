import React from 'react'
import {View} from 'react-native'
import TextMontserrat from './TextMontserrat'
import TextOpenSans from './TextOpenSans'

type Props = {question: string; answer: string}

const QuestionBox: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={{marginVertical: 10}}>
      <TextMontserrat fontSize={18} weight="medium">
        {props.question}
      </TextMontserrat>
      <TextOpenSans
        fontSize={14}
        style={{
          marginTop: 5,
          textAlign: 'justify',
          marginLeft: 10,
          letterSpacing: 0.55,
        }}>
        {props.answer}
      </TextOpenSans>
    </View>
  )
}

export default QuestionBox
