import Axios from 'axios'
import {getServer} from '../Config'
import {VehicleInfo} from '../Screens/Dashboard/types'

const BASE_URL = getServer()

export async function postVehicle(
  vehicle: VehicleInfo,
  authToken: string,
): Promise<boolean> {
  const config = {
    headers: {
      'x-auth-token': `${authToken}`,
    },
  }
  console.log('posting vehicle', vehicle)

  const URL = `${BASE_URL}/api/vehicle`
  try {
    const result = await Axios.post(URL, vehicle, config)
    if (!result.data) throw new Error(`${result}`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
