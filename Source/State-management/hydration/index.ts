import {CollectionChangeSet} from 'realm'
import {postVehicle} from '../../api/vehicle'
import {getRealmInstance} from '../../Database/index'
import {dispatch} from '../../Providers/Providers'
import {ActionAddVehicles} from './actions'

const realm = getRealmInstance()

export async function hydrateVehicleState(): Promise<any> {
  console.info('Hydrating state...')
  try {
    const result = realm.objects('User')[0].vehicles
    result.removeAllListeners()
    result.addListener(vehicleListener)
    if (!result.length) return console.info('Realm empty, Returning')
    const vehiclesCopy = [...result]
    return dispatch(new ActionAddVehicles(vehiclesCopy))
  } catch (error) {
    return console.info('Vehicle state hydrate error', error)
  }
}
// changes contains the index of the item added,deleted or modified
export const vehicleListener = (
  vehicles: any,
  changes: CollectionChangeSet,
) => {
  if (
    changes.insertions.length ||
    changes.deletions.length ||
    changes.modifications.length
  ) {
    if (changes.insertions.length) {
      const vehicle = vehicles[changes.insertions.length]
      postVehicle(vehicle)
        .then((uploadStatus) => {
          realm.write(() => {
            const veh = realm.objects('User')[0].vehicles[changes.insertions]
            veh.uploaded = uploadStatus
          })
          hydrateVehicleState()
        })
        .catch((error) => {
          console.info('Error in postVehicle', error)
        })
      return
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
