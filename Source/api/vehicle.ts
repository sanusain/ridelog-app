import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken} from '../Contexts/AuthProvider'
import {VehicleInfo} from '../Screens/Dashboard/types'

const BASE_URL = getServer()

export async function uploadVehicle(vehicle: VehicleInfo): Promise<boolean> {
  const authToken = getAuthToken()
  if (!authToken) throw new Error('authToken missing')
  const config = {
    headers: {
      'x-auth-token': `${authToken}`,
    },
  }
  const URL = `${BASE_URL}/api/vehicle`
  try {
    const result = await Axios.post(URL, vehicle, config)
    if (result.status !== 201) throw new Error(`${result}`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getVehicles(): Promise<any> {
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken missing')
    const config = {
      headers: {
        'x-auth-token': `${authToken}`,
      },
    }
    const URL = `${BASE_URL}/api/vehicle`
    const result = await Axios.get(URL, config)
    if (result.status === 200) return result.data
    throw new Error(result.statusText)
  } catch (error) {
    console.info('ERROR_FETCHING_VEHICLES', error)
    return error
  }
}

// ep not defined yet

export async function deleteVehicle(vehicle: VehicleInfo): Promise<boolean> {
  try {
    const authToken = getAuthToken()
    if (!authToken) throw new Error('authToken missing')
    const config = {
      headers: {
        'x-auth-token': `${authToken}`,
      },
    }
    const URL = `${BASE_URL}/api/vehicle/${vehicle._id}`
    const result = await Axios.delete(URL, config)
    console.log('result', result)

    if (result.status === 200) return true
    return false
  } catch (error) {
    console.info('ERROR_IN_DELETE_VEHICLE', error)
    return false
  }
}
