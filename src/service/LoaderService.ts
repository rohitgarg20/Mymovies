import { loaderDataStore } from "../store"

export const showLoader = () => {
  loaderDataStore.showProgressLoader()
}

export const hideLoader = () => {
  loaderDataStore.hideProgressLoader()
}