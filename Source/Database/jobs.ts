import {getRealmInstance} from '.'
import {User} from '../Contexts/AuthProvider'
import {RefuelLog, VehicleInfo} from '../Screens/Dashboard/types'

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
      // realm.close()
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
    })
  } catch (error) {
    console.info('ERROR_IN_addVehicleToDb', error)
  }
}

export async function removeVehicleFromDb(vehicle: VehicleInfo): Promise<any> {
  try {
    realm.write(() => {
      // const objTODelete = realm.objects('User')[0]
      let delveh = realm.objectForPrimaryKey('Vehicle', vehicle._id)
      console.log('objTODelete', delveh)
      realm.delete(delveh)
      console.log('possibly deleted')
    })
  } catch (error) {
    console.info('ERROR_IN_removeVehicleFromDb', error)
  }
}

export async function addRefuelLogToDb(log: RefuelLog): Promise<any> {
  try {
    const vehicle = realm.objectForPrimaryKey('Vehicle', log.vehicleId)
    if (vehicle) {
      // @ts-ignore
      realm.write(() => vehicle.refuelLogs.push(log))
      realm.write(() => {
        // @ts-ignore
        vehicle.odo = log.odo
      })
    }
  } catch (error) {
    console.info('ERROR_IN_addRefuelLogToDb', error)
  }
}
export async function removeRefuelLogFromDb(
  refuelLog: RefuelLog,
): Promise<any> {
  try {
    const log = realm.objectForPrimaryKey('RefuelLog', refuelLog._id)
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@refuel log to be deleted', log)

    if (log) {
      realm.write(() => realm.delete(log))
    }
  } catch (error) {
    console.info('ERROR_IN_removeRefuelLogFromDb', error)
  }
}
