import { applyMiddleware, createStore } from "redux"
import { Action } from "./root-action"

const initialState = {
  currentValue: 0,
}

const actionLogger = (state: any) => (next: any) => (action: Action<any>) => {
  console.log("Dispatched", action.type)
  const result = next(action)
  return result
}

export const getStore = () => {
  if (__DEV__) return createStore(rootReducer, applyMiddleware(actionLogger))
  return createStore(rootReducer)
}

const rootReducer = (state: AppState = initialState, action: Action<any>) => {
  if (action.isUserAction) {
    let currentState: AppState = { ...state }
    action.actionSelf.updateState(currentState)
    return currentState
  }
  return state
}

export const dispatchHandler = (dispatch: any) => (action: Action<any>) => {
  dispatch(action.actionSelf.plainObj())
}

export type AppState = typeof initialState
