import {getRealmInstance} from '../../Database/index'
import {Action} from '../root-action'
import {ActionAddVehicles} from './actions'

const realm = getRealmInstance()

export async function hydrateVehicleState(dispatch: {
  (action: Action<any>): void
  (arg0: ActionAddVehicles): void
}): Promise<any> {
  try {
    // @ts-ignore
    const result = realm.objects('User')[0].vehicles
    if (!result.length) {
      console.log('NO REALM DATA, Returning')
      return
    }
    const vehiclesCopy = [...result]
    dispatch(new ActionAddVehicles(vehiclesCopy))
  } catch (error) {
    console.log('error in realm hydration', error)
  }
}
// async function hydrateRefuelLogState(): Promise<any> {
//   try {
//   } catch (error) {}
// }
