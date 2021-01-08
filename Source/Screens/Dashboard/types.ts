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
  refuelLogs?: Array<RefuelLog>
  serviceData?: Array<ServiceData>
  uploaded?: boolean
  modified?: boolean
}

export type RefuelLog = {
  _id: string
  vehicleId: string
  odo: string
  quantity: string
  date: string
  unitCost: string
  totalCost: string
  location: string
  images: Array<ImageSpecs>
}

export type ServiceData = {
  date: string
  images: Array<ImageSpecs>
}
