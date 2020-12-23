import {getRealmInstance} from '.'
import {User} from '../Contexts/AuthProvider'
import {VehicleInfo} from '../Screens/Dashboard/types'

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
  console.warn('DB user delete:No user!')
}

export async function addvehicleToDb(vehicle: VehicleInfo): Promise<any> {
  try {
    console.log('in addvehicle to db', vehicle)
    const user = realm.objects('User')[0]

    realm.write(() => {
      if (user) return user.vehicles.push(vehicle)
      throw new Error('No user')
    })
  } catch (error) {
    console.warn('CATCH ERROR', error)
  }
}
