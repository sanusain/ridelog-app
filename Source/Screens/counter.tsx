import React from "react"
import { Button, Text, View } from "react-native"
import { connect } from "react-redux"
import SafeAreaView from "../Components/SafeAreaView"
import { AppState, dispatchHandler } from "../State-management"
import { ActionDecreaseCounter, ActionIncreaseCounter } from "./actions"

type Props = { counter: number; dispatch: any }

const Counter: React.FC<Props> = (props) => {
  function increase() {
    //@ts-ignore
    props.dispatch(new ActionIncreaseCounter())
  }

  function decrease() {
    //@ts-ignore
    props.dispatch(new ActionDecreaseCounter())
  }

  return (
    <SafeAreaView>
      <View
        style={{
          height: 350,
          justifyContent: "space-between",
          borderWidth: 2,
          borderColor: "red",
        }}
      >
        <Button onPress={increase} title={"increase"} />
        <Button onPress={decrease} title={"decrease"} />
        <Text style={{ fontSize: 70, alignSelf: "center" }}>
          {props.counter}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state: AppState) => ({
  counter: state.currentValue,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

const CounterPresentation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default CounterPresentation
