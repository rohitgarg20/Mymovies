import { action, makeObservable, observable } from "mobx"

const DEFAULT_SETTINGS = {
  showLoader: false
}

export class LoaderDataStore {
  @observable showLoader

  constructor(){
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
    makeObservable(this)
  }

  @action
  showProgressLoader = () => {
    this.showLoader = true
  }

  @action
  hideProgressLoader = () => {
    this.showLoader = false
  }
}