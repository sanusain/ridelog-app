import {AppState} from '.'

export class Action<T> {
  type: string
  payload?: T
  isUserAction: boolean
  actionSelf: Action<T>

  constructor(payload?: T) {
    this.type = this.constructor.name
    this.payload = payload
    this.isUserAction = true
    this.actionSelf = this
  }

  updateState(state: AppState): void {
    if (!this.payload) console.warn('NO_PAYLOAD')
    console.warn('ERROR: update state from child', state)
  }

  plainObj(): any {
    return {
      actionSelf: this,
      type: this.type,
      payload: this.payload,
      isUserAction: this.isUserAction,
    }
  }
}
