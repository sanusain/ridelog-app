import {addvehicleToDb} from '../../Database/jobs'
import {VehicleInfo} from './types'

export async function addVehicleToDb(vehicle: VehicleInfo): Promise<boolean> {
  try {
    await addvehicleToDb(vehicle)
    return true
  } catch (error) {
    console.info('ERROR_IN_addVehicleToDb', error)
    return false
  }
}
