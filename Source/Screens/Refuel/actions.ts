import {AppState} from '../../State-management'
import {Action} from '../../State-management/root-action'
import {ImageSpecs, RefuelLog} from '../../Types'

export class ActionSetRefuelData extends Action<RefuelLog> {
  updateState(state: AppState): void {
    if (this.payload) state.refuel.refuelLog = this.payload
  }
}

export class ActionAddImage extends Action<ImageSpecs> {
  updateState(state: AppState): void {
    if (this.payload)
      state.refuel.addRefuelLog.images = [
        ...state.refuel.addRefuelLog.images,
        this.payload,
      ]
  }
}

export class ActionResetImages extends Action<any> {
  updateState(state: AppState): void {
    if (!this.payload) state.refuel.addRefuelLog.images = []
  }
}

export class ActionRemoveRefuelLogImage extends Action<ImageSpecs> {
  updateState(state: AppState): void {
    if (this.payload) {
      state.refuel.addRefuelLog.images.forEach((item, index) => {
        if (item._id === this.payload?._id) {
          state.refuel.addRefuelLog.images.splice(index, 1)
        }
      })
    }
  }
}

export class ActionSetUploadProgress extends Action<number> {
  updateState(state: AppState): void {
    if (this.payload) state.misc.imageUploadProgress += this.payload
  }
}

export class ActionResetUploadProgress extends Action<any> {
  updateState(state: AppState): void {
    if (!this.payload) state.misc.imageUploadProgress = 0
  }
}

export class ActionSetImageViewInitialIndex extends Action<number> {
  updateState(state: AppState): void {
    if (this.payload) state.refuel.imageViewInitialIndex = this.payload
  }
}
export class ActionResetImageViewInitialIndex extends Action<any> {
  updateState(state: AppState): void {
    if (!this.payload) state.refuel.imageViewInitialIndex = 0
  }
}

export class ActionSetCloudOperationStatus extends Action<boolean> {
  updateState(state: AppState): void {
    if (this.payload) state.misc.cloudOperationStatus = this.payload
  }
}
