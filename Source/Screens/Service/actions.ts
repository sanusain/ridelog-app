import {AppState} from '../../State-management'
import {Action} from '../../State-management/root-action'
import {ServiceLog} from '../../Types'

export class ActionSetServiceData extends Action<ServiceLog> {
  updateState(state: AppState): void {
    if (this.payload) state.service.serviceLog = this.payload
  }
}
