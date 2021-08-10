import { action, makeObservable, observable } from "mobx";

const DEFAULT_SETTINGS = {
  showPopup: false,
  popupRenderingContent: undefined
}

export class PopupStore {
  @observable showPopup
  @observable popupRenderingContent

  constructor(){
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
  }

  @action
  showPopupComponent = () => {
    this.showPopup = true
  }

  @action
  hidePopupComponent = () => {
    this.showPopup = false
  }

  @action
  setPopuprenderingContent = (content) => {
    this.popupRenderingContent = content
  }


}