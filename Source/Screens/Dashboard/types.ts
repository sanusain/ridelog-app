export type vehicleInfo = {
  vcallsign: string
  maker: string
  model: string
  odo: number
  plate: string
  vin: string
  year: number
  refuelData: RefuelData
  serviceData: ServiceData
}

export type RefuelData = {
  uid: string
  odo: string
  quantity: string
  date: Date
  cost: string
}

export type ServiceData = {
  uid: string
  date: Date
}
