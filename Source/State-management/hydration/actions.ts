import {AppState} from '..'
import {VehicleInfo} from '../../Screens/Dashboard/types'
import {Action} from '../root-action'

export class ActionAddVehicles extends Action<Array<VehicleInfo>> {
  updateState(state: AppState) {
    if (this.payload) {
      state.vehicles = this.payload
    }
  }
}
// export class ActionSetFetchingVehicle extends Action<any> {
//   updateState(state: AppState) {
//     if (!this.payload) state.misc.fetchingVehicle = !state.misc.fetchingVehicle
//   }
// }
// create separate action for selected vehicle using a
// field if requried
