import {applyMiddleware, createStore} from 'redux'
import {RefuelData, ServiceData, VehicleInfo} from '../Screens/Dashboard/types'
import {ImageSpecs} from '../Screens/Refuel/types'
import {Action} from './root-action'

const refuelData: Array<RefuelData> | undefined = []
const serviceData: Array<ServiceData> = []
const vehicles: Array<VehicleInfo> = []
const selectedVehicle: VehicleInfo = {
  _id: '',
  vcallsign: '',
  maker: '',
  model: '',
  odo: '',
  plate: '',
  vin: '',
  year: '',
  images: [],
  refuelData,
  serviceData,
}
const refuelLogImages: Array<ImageSpecs> = []
const refuelLog: RefuelData = {
  _id: '',
  odo: '',
  quantity: '',
  date: '',
  price: '',
  cost: '',
  location: '',
  images: [],
}
const initialState = {
  userInfo: {
    userCallsign: '',
    avatar: '',
    email: '',
    lastLogin: '',
  },
  selectedVehicle,
  vehicles,
  refuel: {
    addRefuelLog: {
      images: refuelLogImages,
    },
    refuelLog,
    imageViewInitialIndex: 0,
  },
  misc: {
    imageUploadProgress: 0,
    fetchingVehicle: false,
  },
}

const actionLogger = () => (next: any) => (action: Action<any>) => {
  console.log('Dispatching', action.type)
  return next(action)
}

export const getStore = () => {
  if (__DEV__) return createStore(rootReducer, applyMiddleware(actionLogger))
  return createStore(rootReducer)
}

const rootReducer = (state: AppState = initialState, action: Action<any>) => {
  if (action && action.isUserAction) {
    let currentState: AppState = {...state}
    // mutating the currentstate object in the new actions
    action.actionSelf.updateState(currentState)
    return currentState
  }
  return state
}

export const dispatchHandler = (dispatch: any) => (action: Action<any>) => {
  dispatch(action.actionSelf.plainObj())
}

export type AppState = typeof initialState
