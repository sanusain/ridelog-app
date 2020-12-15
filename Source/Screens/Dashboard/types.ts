import {ImageSpecs} from '../Refuel/types'

export type VehicleInfo = {
  _id: string
  vcallsign: string
  maker: string
  model: string
  odo: string
  plate: string
  vin: string
  year: string
  images: Array<ImageSpecs>
  refuelData?: Array<RefuelData>
  serviceData?: Array<ServiceData>
}

export type RefuelData = {
  _id: string
  odo: string
  quantity: string
  date: string
  price: string
  cost: string
  location: string
  images: Array<ImageSpecs>
}

export type ServiceData = {
  date: string
  images: Array<ImageSpecs>
}
