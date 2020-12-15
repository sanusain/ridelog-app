import {AppState} from '..'
import {VehicleInfo} from '../../Screens/Dashboard/types'
import {Action} from '../root-action'

export class ActionAddVehicles extends Action<Array<VehicleInfo>> {
  updateState(state: AppState) {
    if (this.payload) {
      //   this.payload.map((vehicle) => delete vehicle.modified)
      // console.log('in actionaddvehicles', this.payload)
      this.payload.map((vehicle) => {
        return state.vehicles.push(vehicle)
      })
      console.log('in action state', state)
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
