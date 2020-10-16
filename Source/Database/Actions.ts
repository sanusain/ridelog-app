import { vehicleInfo } from "../Screens/Dashboard/types"
import { AppState } from "../State-management"
import { Action } from "../State-management/root-action"

export class ActionSetVehicles extends Action<vehicleInfo> {
  updateState(state: AppState) {
    if (this.payload)
      if (
        state.vehiclesInfo.findIndex(
          (value) => JSON.stringify(value) === JSON.stringify(this.payload)
        ) === -1
      )
        state.vehiclesInfo.push(this.payload)
  }
}

export class ActionRemoveVehicle extends Action<string> {
  updateState(state: AppState) {
    state.vehiclesInfo.forEach((item, index) => {
      if (item.vcallsign === this.payload) {
        state.vehiclesInfo.splice(index, 1)
      }
    })
  }
}
