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
    // @ts-ignore
    const {vehicles, firstLaunch} = realm.objects('User')[0]

    vehicles.removeAllListeners()
    vehicles.addListener(vehicleListener)
    if (!vehicles.length && firstLaunch) {
      getRemoteVehiclesToDb()
      return
    }

    const vehiclesCopy = [...vehicles]
    dispatch(new ActionAddVehicles(vehiclesCopy))
  } catch (error) {
    console.info('ERROR_IN_VEHICLE_HYDRATION', error)
  }
}
// changes contains the index of the item added,deleted or modified
export const vehicleListener = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  vehicles: any,
  changes: CollectionChangeSet,
): void => {
  console.info('____IN_LISTENER____')

  if (
    changes.insertions.length ||
    changes.deletions.length ||
    changes.newModifications.length
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
      console.info('ERROR_IN_VEHICLE_INSERTION', error)
    }

    // try {
    //   if (changes.deletions.length) {
    //     console.log('changes.deletions', changes.deletions)
    //     // const vehicle = vehicles[changes.deletions]
    //     // deleteVehicle(vehicle)
    //     hydrateVehicleState()
    //   }
    // } catch (error) {
    //   console.info('ERROR_IN_VEHICLE_DELETION', error)
    // }

    if (changes.newModifications.length) {
      try {
        console.log(
          'changes.newModifications.length',
          changes.newModifications.length,
        )
      } catch (error) {
        console.info('ERROR_IN_Realm_Modification', error)
      }
    }
  }
  console.log('out of listener')
}
