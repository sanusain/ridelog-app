import {CollectionChangeSet} from 'realm'
import {
  REFUEL,
  SERVICE,
  UPLOAD_TYPE_ADD,
  UPLOAD_TYPE_MODIFIED,
  UPLOAD_TYPE_REMOVE,
  VEHICLE,
} from '../../../Constant'
import {addCloudRefuelLog, removeCloudRefuelLog} from '../../api/refuel'
import {deleteVehicle, getVehicles, uploadVehicle} from '../../api/vehicle'
import {getRealmInstance} from '../../Database/index'
import {addvehicleToDb} from '../../Database/jobs'
import {UploadTrackerSchema} from '../../Database/schema'
import {dispatch} from '../../Providers/Providers'
import {RefuelLog, VehicleInfo} from '../../Screens/Dashboard/types'
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
    const {vehicles, firstLaunch, uploadTracker} = realm.objects('User')[0]
    uploadTracker.removeAllListeners()
    uploadTracker.addListener(uploadTrackerListener)
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
const vehicleListener = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  vehicles: any,
  changes: CollectionChangeSet,
): void => {
  console.info('____IN_LISTENER____')
  if (
    changes.insertions.length ||
    changes.deletions.length ||
    changes.newModifications.length
  )
    hydrateVehicleState()
  console.info('OUT_OF_LISTENER')
}

const uploadTrackerListener = (
  uploadTrackers: Array<typeof UploadTrackerSchema.properties>,
  changes: CollectionChangeSet,
) => {
  /**
   * checking only for addition of records, we dont care about
   * deletion or modification as it doesnt matter.
   */
  if (changes.insertions.length) {
    uploadTrackers.forEach((ut: typeof UploadTrackerSchema.properties) => {
      if (ut.uploaded) {
        realm.write(() => {
          realm.delete(ut)
        })
        return
      }
      switch (ut.logType) {
        case VEHICLE: {
          // @ts-ignore
          const vehicle: VehicleInfo = realm.objectForPrimaryKey(
            'Vehicle',
            ut.logId,
          )

          if (vehicle) {
            switch (ut.uploadType) {
              case UPLOAD_TYPE_ADD:
                uploadVehicle(vehicle)
                  .then(() => {
                    realm.write(() => {
                      realm.delete(ut)
                      console.info('VEHICLE_ADD_TASK_REQUESTED', ut)
                    })
                  })
                  .catch((error) => {
                    console.info('ERROR_IN_CASE_VEHICLE_ADD', error)
                  })
                break
              case UPLOAD_TYPE_REMOVE:
                deleteVehicle(vehicle)
                  .then(() => {
                    realm.write(() => {
                      realm.delete(ut)
                      console.info('VEHICLE_REMOVE_TASK_REQUESTED', ut)
                    })
                  })
                  .catch((error) => {
                    console.info('ERROR_IN_CASE_VEHICLE_REMOVE', error)
                  })
                break
              case UPLOAD_TYPE_MODIFIED:
                // implementd later
                break

              default:
                console.info('uploadType mismatch')
            }
          }
          break
        }
        case REFUEL: {
          // @ts-ignore
          const refuelLog: RefuelLog = realm.objectForPrimaryKey(
            'RefuelLog',
            ut.logId,
          )
          if (refuelLog) {
            switch (ut.uploadType) {
              case UPLOAD_TYPE_ADD:
                addCloudRefuelLog(refuelLog)
                  .then(() => {
                    realm.write(() => {
                      realm.delete(ut)
                      console.info('REFUELLOG_ADD_TASK_REQUESTED', ut)
                    })
                  })
                  .catch((error) => {
                    console.info('ERROR_IN_CASE_REFUEL', error)
                  })
                break
              case UPLOAD_TYPE_REMOVE:
                removeCloudRefuelLog(refuelLog)
                  .then(() => {
                    realm.write(() => {
                      realm.delete(ut)
                      console.info('REFUELLOG_REMOVE_TASK_REQUESTED', ut)
                    })
                  })
                  .catch((error) => {
                    console.info('ERROR_IN_CASE_REFUEL_REMOVE', error)
                  })
                break
              case UPLOAD_TYPE_MODIFIED:
                // implemented later
                break

              default:
                console.info('uploadType mismatch')
            }
          }
          break
        }
        case SERVICE:
          console.log('ut.logType', ut.logType)
          break

        default:
          console.log('invalid option')
      }
    })
  }
}
