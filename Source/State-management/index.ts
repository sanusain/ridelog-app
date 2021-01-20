import {applyMiddleware, createStore, Store} from 'redux'
import {ImageSpecs, RefuelLog, ServiceLog, VehicleInfo} from '../Types'
import {Action} from './root-action'

const refuelData: Array<RefuelLog> | undefined = []
const serviceData: Array<ServiceLog> = []
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
  refuelLogs: refuelData,
  serviceLogs: serviceData,
}
const refuelLogImages: Array<ImageSpecs> = []
const serviceLogImages: Array<ImageSpecs> = []
const refuelLog: RefuelLog = {
  vehicleId: '',
  _id: '',
  odo: '',
  quantity: '',
  date: '',
  unitCost: '',
  totalCost: '',
  location: '',
  images: [],
  uploaded: false,
  modified: false,
}

const serviceLog: ServiceLog = {
  vehicleId: '',
  _id: '',
  odo: '',
  date: '',
  totalCost: '',
  serviceCount: '',
  notes: '',
  location: '',
  images: [],
  uploaded: false,
  modified: false,
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
  service: {
    addServiceLog: {
      images: serviceLogImages,
    },
    serviceLog,
    imageViewInitialIndex: 0,
  },
  misc: {
    imageUploadProgress: 0,
    fetchingVehicle: false,
    cloudOperationStatus: false,
  },
}

const actionLogger = () => (next: any) => (action: Action<any>) => {
  console.info('Dispatching', action.type)
  return next(action)
}

export const getStore = (): Store => {
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
