import { AppState } from "../../State-management"
import { Action } from "../../State-management/root-action"
import { RefuelData } from "../Dashboard/types"

export class ActionSetRefuelData extends Action<RefuelData> {
  updateState(state: AppState) {
    if (this.payload) state.refuelData = this.payload
  }
}
