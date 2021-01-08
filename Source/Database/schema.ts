import Realm from 'realm'

export const RefuelLogSchema: Realm.ObjectSchema = {
  name: 'RefuelLog',
  properties: {
    _id: {type: 'string', indexed: true},
    vehicleId: 'string',
    date: 'date',
    odo: 'string',
    quantity: 'string',
    unitCost: 'string',
    totalCost: 'string',
    location: 'string',
    images: {type: 'ImageSpec[]', default: []},
    uploaded: {type: 'bool', default: false},
    modified: {type: 'bool', default: false},
  },
  primaryKey: '_id',
}

export const ImageSpecSchema: Realm.ObjectSchema = {
  name: 'ImageSpec',
  properties: {
    _id: {type: 'string', indexed: true},
    url: 'string',
    height: 'int',
    width: 'int',
  },
  primaryKey: '_id',
}

export const VehicleSchema: Realm.ObjectSchema = {
  name: 'Vehicle',
  properties: {
    _id: {type: 'string', indexed: true},
    vcallsign: 'string',
    vin: 'string',
    year: 'string',
    maker: 'string',
    model: 'string',
    odo: 'string',
    plate: 'string',
    images: {type: 'ImageSpec[]', default: []},
    refuelLogs: {type: 'RefuelLog[]', default: []},
    uploaded: {type: 'bool', default: false},
    modified: {type: 'bool', default: false},
  },
  primaryKey: '_id',
}

export const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  properties: {
    _id: {type: 'string', indexed: true},
    name: 'string?',
    callsign: 'string',
    email: 'string',
    phone: 'string?',
    avatar: 'string?',
    vehicles: {type: 'Vehicle[]', default: []},
    firstLaunch: {type: 'bool', default: true},
  },
  primaryKey: '_id',
}
