import {postVehicle} from '../../api/vehicle'
import {addvehicleToDb} from '../../Database/jobs'
import {VehicleInfo} from './types'

export async function addVehicleToDbAndCloud(
  vehicle: VehicleInfo,
  authToken: string,
): Promise<boolean> {
  try {
    await addvehicleToDb(vehicle)
    await postVehicle(vehicle, authToken)
    return true
  } catch (error) {
    console.log('Couldnt add vehicle to cloud or db', error)
    return false
  }
}
