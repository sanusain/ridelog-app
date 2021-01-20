export type ImageSpecs = {
  _id: string
  url: string
  height: number
  width: number
}

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
  serviceLogs?: Array<ServiceLog>
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
  uploaded: boolean
  modified: boolean
}

export type ServiceLog = {
  _id: string
  vehicleId: string
  date: string
  odo: string
  totalCost: string
  serviceCount: string
  location: string
  notes: string
  images: Array<ImageSpecs>
  uploaded: boolean
  modified: boolean
}
