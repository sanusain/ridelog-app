import {CollectionChangeSet} from 'realm'
import {getVehicles, postVehicle} from '../../api/vehicle'
import {getRealmInstance} from '../../Database/index'
import {addvehicleToDb} from '../../Database/jobs'
import {dispatch} from '../../Providers/Providers'
import {ActionAddVehicles} from './actions'

const realm = getRealmInstance()

async function getRemoteVehiclesToDb() {
  try {
    const vehicles = await getVehicles()
    if (!vehicles.length) return

    // eslint-disable-next-line no-restricted-syntax
    for (let vehicle of vehicles) {
      vehicle.uploaded = true
      addvehicleToDb(vehicle)
    }
  } catch (error) {
    console.info('ERROR_IN_getRemoteVehiclesToDb', error)
  }
}

export async function hydrateVehicleState() {
  console.info('Hydrating state...')
  try {
    const result = realm.objects('User')[0].vehicles
    result.removeAllListeners()
    result.addListener(vehicleListener)
    if (!result.length) {
      getRemoteVehiclesToDb()
      return
    }

    const vehiclesCopy = [...result]
    dispatch(new ActionAddVehicles(vehiclesCopy))
  } catch (error) {
    console.info('ERROR_IN_VEHICLE_HYDRATION', error)
  }
}
// changes contains the index of the item added,deleted or modified
export const vehicleListener = (
  vehicles: any,
  changes: CollectionChangeSet,
) => {
  console.info('****IN_LISTENER****')

  if (
    changes.insertions.length ||
    changes.deletions.length ||
    changes.modifications.length
  ) {
    try {
      if (changes.insertions.length) {
        const vehicle = vehicles[changes.insertions]
        if (!vehicle.uploaded) {
          postVehicle(vehicle)
            .then((uploadStatus) => {
              realm.write(() => {
                const veh = realm.objects('User')[0].vehicles[
                  changes.insertions
                ]
                veh.uploaded = uploadStatus
              })
            })
            .catch((error) => {
              console.info('Error in postVehicle', error)
            })
        }
        hydrateVehicleState()
        return
      }
    } catch (error) {
      console.log('ERROR_IN_VEHICLE_INSERTION', error)
    }

    if (changes.deletions.length) {
      /**
       remove from server api, implemented when
       multiple vehicle support will be included
       * 
       */
    }
  }
}
