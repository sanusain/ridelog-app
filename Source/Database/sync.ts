import {getRealmInstance} from '.'
import {getLoggedInUser} from './jobs'

export async function startSync(): Promise<any> {
  const user = getLoggedInUser()
  try {
    // action set sync true
    // track first app launch
    // if first app launch.. then start sync..upon completion
    // set first app launch to false.
    const realm = getRealmInstance()
    const dbuser = realm.objects('User')[0]

    // dbuser.vehicles.forEach(async (vehicle) => {
    //   if (!vehicle.uploaded) {
    //     console.log('vehicle', vehicle)
    //     const vehicleCopy = JSON.parse(JSON.stringify(vehicle))
    //     console.log('vehicleCopy', vehicleCopy)
    //     delete vehicleCopy.uploaded
    //     delete vehicleCopy.modified

    //     const isAdded: boolean = await postVehicle(vehicleCopy, user)
    //     if (isAdded) {
    //       vehicle.uploaded = true
    //       return console.log('added vehicle')
    //     }
    //     return console.log('not added')
    //   }
    // })

    // eslint-disable-next-line no-restricted-syntax
    for (const vehicle of dbuser.vehicles) {
      if (!vehicle.uploaded) {
        console.log('vehicle', vehicle)
        const vehicleCopy = JSON.parse(JSON.stringify(vehicle))
        console.log('vehicleCopy', vehicleCopy)
        delete vehicleCopy.uploaded
        delete vehicleCopy.modified

        const isAdded: boolean = await postVehicle(vehicleCopy, user)
        if (isAdded) {
          vehicle.uploaded = true
          return console.log('added vehicle')
        }
        return console.log('not added')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// cannot iterate over vehicles array, possible issue with async usage
// for foreach
