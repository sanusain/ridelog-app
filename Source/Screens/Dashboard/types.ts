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
  vehicleData: {
    lastRefuelQty: string
    lastRefuelDate: Date
  }
}

export type RefuelData = {
  uid: string
  odo: string
  quantity: string
  date: string
  cost: string
}

export type ServiceData = {
  uid: string
  date: Date
}
