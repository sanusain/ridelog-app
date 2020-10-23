import { AppState } from "../../State-management"
import { Action } from "../../State-management/root-action"
import { RefuelData } from "../Dashboard/types"
import { ImageSpecs } from "./types"

export class ActionSetRefuelData extends Action<RefuelData> {
  updateState(state: AppState) {
    if (this.payload) state.refuel.refuelLog = this.payload
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

export class ActionRemoveRefuelLogImage extends Action<ImageSpecs> {
  updateState(state: AppState) {
    if (this.payload) {
      state.refuel.addRefuelLog.images.forEach((item, index) => {
        if (item.uid === this.payload?.uid) {
          state.refuel.addRefuelLog.images.splice(index, 1)
        }
      })
    }
  }
}

export class ActionSetUploadProgress extends Action<number> {
  updateState(state: AppState) {
    if (this.payload) state.misc.imageUploadProgress = this.payload
  }
}

export class ActionResetUploadProgress extends Action<any> {
  updateState(state: AppState) {
    state.misc.imageUploadProgress = 0
  }
}
export class ActionAddUploadURL extends Action<string> {
  updateState(state: AppState) {
    if (this.payload) state.refuel.uploadedImageURLs.push(this.payload)
  }
}
export class ActionResetUploadURLs extends Action<any> {
  updateState(state: AppState) {
    state.refuel.uploadedImageURLs = []
  }
}
