import { RefuelData, vehicleInfo } from "../Screens/Dashboard/types"
import { AppState } from "../State-management"
import { Action } from "../State-management/root-action"

export class ActionSetSelectedVehicle extends Action<vehicleInfo> {
  updateState(state: AppState) {
    if (this.payload) {
      state.selectedVehicle = this.payload
    }
  }
}

export class ActionSetRefuelLog extends Action<RefuelData> {
  updateState(state: AppState) {
    if (this.payload) {
      if (
        state.selectedVehicle.refuelData.findIndex(
          (item) => item.uid === this.payload?.uid
        ) === -1
      )
        state.selectedVehicle.refuelData.push(this.payload)
    }
  }
}
