import { action, makeObservable, observable } from "mobx"

const DEFAULT_SETTINGS = {
  router: undefined,
  currentStackName: ''

}

export class NavigationDataStore {
  @observable router
  @observable currentStackName

  constructor(){
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
    makeObservable(this)
  }

  @action
  setCurrentStackName = (stackName) => {
    this.currentStackName = stackName
  }

  @action
  setRouter = (routerState) => {
    this.router = routerState
  }


}