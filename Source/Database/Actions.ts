import { vehicleInfo } from "../Screens/Dashboard/types"
import { AppState } from "../State-management"
import { Action } from "../State-management/root-action"

export class ActionInitializeVehicleInfo extends Action<any> {
  updateState(state: AppState) {
    state.vehiclesInfo = []
  }
}

export class ActionSetVehicles extends Action<vehicleInfo> {
  updateState(state: AppState) {
    //@ts-ignore
    if (this.payload)
      if (
        state.vehiclesInfo.findIndex(
          (value) => JSON.stringify(value) === JSON.stringify(this.payload)
        ) === -1
      )
        state.vehiclesInfo.push(this.payload)
  }
}
