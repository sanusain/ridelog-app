import { AppState } from "../../State-management"
import { Action } from "../../State-management/root-action"
import { RefuelData } from "../Dashboard/types"
import { ImageSpecs } from "./types"

export class ActionSetRefuelData extends Action<RefuelData> {
  updateState(state: AppState) {
    if (this.payload) state.refuelData = this.payload
  }
}

export class ActionAddImage extends Action<ImageSpecs> {
  updateState(state: AppState) {
    if (this.payload) state.refuel.addRefuelLog.images.push(this.payload)
  }
}

export class ActionResetImages extends Action<any> {
  updateState(state: AppState) {
    state.refuel.addRefuelLog.images = []
  }
}
