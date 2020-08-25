import React from "react"
import { Provider } from "react-redux"
import CounterPresentation from "../Screens/counter"
import { getStore } from "../State-management"

export default function Providers() {
  const store = getStore()
  console.log("state", store.getState())

  return (
    <Provider store={store}>
      <CounterPresentation />
    </Provider>
  )
}
