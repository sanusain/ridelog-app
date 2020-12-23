import {postVehicle} from '../../api/vehicle'
import {addvehicleToDb} from '../../Database/jobs'
import {VehicleInfo} from './types'

export async function addVehicleToDbAndCloud(
  vehicle: VehicleInfo,
): Promise<boolean> {
  try {
    await addvehicleToDb(vehicle)
    await postVehicle(vehicle)
    return true
  } catch (error) {
    console.info('Couldnt add vehicle to cloud or db', error)
    return false
  }
}
