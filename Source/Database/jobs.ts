import ObjectID from 'bson-objectid'
import {getRealmInstance} from '.'
import {
  REFUEL,
  SERVICE,
  UPLOAD_TYPE_ADD,
  UPLOAD_TYPE_REMOVE,
  VEHICLE,
} from '../../Constant'
import {User} from '../Contexts/AuthProvider'
import {RefuelLog, ServiceLog, VehicleInfo} from '../Types'

const realm = getRealmInstance()
let realmUser: User

export function getLoggedInUser(): User {
  return realmUser
}

export async function dbAddUser(user: User): Promise<any> {
  if (user) {
    realmUser = {...user}
    try {
      realm.write(() => {
        realm.create('User', user)
      })
    } catch (error) {
      return error
    }
    return user._id
  }
  return new Error(`User not of type User,${user}`)
}

export async function dbRemoveUser(user: User): Promise<any> {
  if (user)
    try {
      realm.write(() => {
        const delUser = realm.objectForPrimaryKey('User', user._id)
        realm.delete(delUser)
      })
    } catch (error) {
      console.error('dbuser not deleted', error)
    }
  console.info('DB user delete:No user!')
}

export async function addvehicleToDb(vehicle: VehicleInfo): Promise<any> {
  try {
    const user = realm.objects('User')[0]
    realm.write(() => {
      if (!user) throw new Error('NO_USER')
      // @ts-ignore
      user.vehicles.push(vehicle)
      // mark firstlaunch as false
      // @ts-ignore
      if (user.firstLaunch) user.firstLaunch = false
      if (!vehicle.uploaded) {
        // @ts-ignore
        user.uploadTracker.push({
          _id: new ObjectID().str,
          logId: vehicle._id,
          logType: VEHICLE,
          uploaded: vehicle.uploaded,
          uploadType: UPLOAD_TYPE_ADD,
        })
      }
    })
  } catch (error) {
    console.info('ERROR_IN_addVehicleToDb', error)
  }
}

export async function removeVehicleFromDb(vehicle: VehicleInfo): Promise<any> {
  try {
    const user = realm.objects('User')[0]
    let delveh = realm.objectForPrimaryKey('Vehicle', vehicle._id)
    realm.write(() => {
      console.log('objTODelete', delveh)
      realm.write(() => {
        realm.delete(delveh)
        // @ts-ignore
        user.uploadTracker.push({
          _id: new ObjectID().str,
          logId: vehicle._id,
          logType: VEHICLE,
          uploaded: vehicle.uploaded,
          uploadType: UPLOAD_TYPE_REMOVE,
        })
      })
      console.log('possibly deleted')
    })
  } catch (error) {
    console.info('ERROR_IN_removeVehicleFromDb', error)
  }
}

export async function addRefuelLogToDb(log: RefuelLog): Promise<any> {
  try {
    const vehicle = realm.objectForPrimaryKey('Vehicle', log.vehicleId)
    const user = realm.objects('User')[0]

    if (vehicle) {
      realm.write(() => {
        // @ts-ignore
        vehicle.refuelLogs.push(log)
        // @ts-ignore
        vehicle.odo = log.odo
        if (!log.uploaded) {
          // @ts-ignore
          user.uploadTracker.push({
            _id: new ObjectID().str,
            logId: log._id,
            logType: REFUEL,
            uploaded: log.uploaded,
            uploadType: UPLOAD_TYPE_ADD,
          })
        }
      })
    }
  } catch (error) {
    console.info('ERROR_IN_addRefuelLogToDb', error)
  }
}
export async function removeRefuelLogFromDb(log: RefuelLog): Promise<any> {
  try {
    const realmRefuelLog = realm.objectForPrimaryKey('RefuelLog', log._id)
    // @ts-ignore
    const {uploadTracker} = realm.objects('User')[0]
    if (realmRefuelLog) {
      realm.write(() => {
        uploadTracker.push({
          _id: new ObjectID().str,
          logId: log._id,
          logType: REFUEL,
          uploaded: log.uploaded,
          uploadType: UPLOAD_TYPE_REMOVE,
        })
        realm.delete(realmRefuelLog)
      })
    }
  } catch (error) {
    console.info('ERROR_IN_removeRefuelLogFromDb', error)
  }
}

export async function addServiceLogToDb(log: ServiceLog): Promise<any> {
  try {
    const vehicle = realm.objectForPrimaryKey('Vehicle', log.vehicleId)
    const user = realm.objects('User')[0]

    if (vehicle) {
      realm.write(() => {
        // @ts-ignore
        vehicle.serviceLogs.push(log)
        // @ts-ignore
        vehicle.odo = log.odo
        if (!log.uploaded) {
          // @ts-ignore
          user.uploadTracker.push({
            _id: new ObjectID().str,
            logId: log._id,
            logType: SERVICE,
            uploaded: log.uploaded,
            uploadType: UPLOAD_TYPE_ADD,
          })
        }
      })
    }
  } catch (error) {
    console.info('ERROR_IN_addServiceLogToDb', error)
  }
}

export async function removeServiceLogFromDb(log: ServiceLog): Promise<any> {
  try {
    const realmServiceLog = realm.objectForPrimaryKey('ServiceLog', log._id)
    // @ts-ignore
    const {uploadTracker} = realm.objects('User')[0]
    if (realmServiceLog) {
      realm.write(() => {
        uploadTracker.push({
          _id: new ObjectID().str,
          logId: log._id,
          logType: SERVICE,
          uploaded: log.uploaded,
          uploadType: UPLOAD_TYPE_REMOVE,
        })
        realm.delete(realmServiceLog)
      })
    }
  } catch (error) {
    console.info('ERROR_IN_removeServiceLogFromDb', error)
  }
}
