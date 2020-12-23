import Axios from 'axios'
import {getServer} from '../Config'
import {getAuthToken} from '../Contexts/AuthProvider'
import {VehicleInfo} from '../Screens/Dashboard/types'

const BASE_URL = getServer()

export async function postVehicle(vehicle: VehicleInfo): Promise<boolean> {
  const authToken = await getAuthToken()
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
