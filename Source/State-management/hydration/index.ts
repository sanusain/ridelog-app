import {CollectionChangeSet} from 'realm'
import {getVehicles, uploadVehicle} from '../../api/vehicle'
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

export async function hydrateVehicleState(): Promise<any> {
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
      /** For this single vehicle operation, everthing that is changed inside a
       * vehicle is considered a change, rather than addition or deletion.
       * Hence, tracking only the modifications for hydration.
       */
      if (changes.insertions.length) {
        // @ts-ignore
        const vehicle = vehicles[changes.insertions]
        if (!vehicle.uploaded) {
          // @ts-ignore
          const veh = realm.objects('User')[0].vehicles[changes.insertions]
          uploadVehicle(vehicle)
            .then((uploadStatus) => {
              realm.write(() => {
                veh.uploaded = uploadStatus
              })
            })
            .catch((error) => {
              console.info('Error in uploadVehicle', error)
            })
        }
      }
    } catch (error) {
      console.info('ERROR_IN_VEHICLE_INSERTION', error)
    }

    // if (changes.deletions.length)
    //   console.log(
    //     '@@@@@@@@@@@@@@@@@@@@@@@changes.deletions.length',
    //     changes.deletions.length,
    //   )
    // if (changes.newModifications.length)
    //   console.log(
    //     '@@@@@@@@@@@@@@@@@@@@@@changes.modification.length',
    //     vehicles[changes.newModifications.length],
    //   )
    console.log(
      '************************changes',
      changes.newModifications(vehicles[changes.newModifications]),
    )
    hydrateVehicleState()
  }
  console.info('OUT_OF_LISTENER')
}
