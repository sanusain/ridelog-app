import { AppState } from "../State-management"
import { Action } from "../State-management/root-action"

export class ActionIncreaseCounter extends Action<any> {
  updateState(state: AppState) {
    state.currentValue++
  }
}
export class ActionDecreaseCounter extends Action<any> {
  updateState(state: AppState) {
    state.currentValue--
  }
}
