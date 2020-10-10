import { ImageSpecs } from "../Refuel/types"

export type vehicleInfo = {
  vcallsign: string
  maker: string
  model: string
  odo: string
  plate: string
  vin: string
  year: string
  images: Array<string>
  refuelData: Array<RefuelData>
  serviceData: Array<ServiceData>
}

export type RefuelData = {
  uid: string
  odo: string
  quantity: string
  date: string
  cost: string
  images: Array<ImageSpecs>
}

export type ServiceData = {
  uid: string
  date: string
  images: Array<ImageSpecs>
}
