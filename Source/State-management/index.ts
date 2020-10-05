import { applyMiddleware, createStore } from "redux"
import { RefuelData, vehicleInfo } from "../Screens/Dashboard/types"
import { Action } from "./root-action"

// vehiclesInfo contains object of this type, where vehicle1 is the vehicle callsign
// vehicle1: {
//   vehicleCallsign: "",
//   maker: "",
//   model: "",
//   odo: "",
//   plate: "",
//   vin: "",
//   year: "",
// },

const vehiclesInfomation: Array<vehicleInfo> = []
const refuelData: RefuelData = {
  uid: "",
  cost: "",
  date: "",
  odo: "",
  quantity: "",
  images: [],
}
const initialState = {
  userInfo: {
    userCallsign: "",
    avatar: "",
    email: "",
    lastLogin: "",
  },
  vehiclesInfo: vehiclesInfomation,
  refuelData: refuelData,
}

const actionLogger = (state: any) => (next: any) => (action: Action<any>) => {
  console.log("Dispatched", action.type)
  return next(action)
}

export const getStore = () => {
  if (__DEV__) return createStore(rootReducer, applyMiddleware(actionLogger))
  return createStore(rootReducer)
}

const rootReducer = (state: AppState = initialState, action: Action<any>) => {
  if (action && action.isUserAction) {
    const currentStateJSON = JSON.parse(JSON.stringify(state)) // deep-copy state
    let updatedState: AppState = { ...currentStateJSON }
    action.actionSelf.updateState(updatedState)
    return updatedState
  }
  return state
}

export const dispatchHandler = (dispatch: any) => (action: Action<any>) => {
  dispatch(action.actionSelf.plainObj())
}

export type AppState = typeof initialState
