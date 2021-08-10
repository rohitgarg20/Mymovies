import { CommonActions } from "@react-navigation/native"

let _navigator = undefined

const setTopLevelNavigator = (navigator) => {
  _navigator = navigator
}

const navigateMainNavigator = (routeName, params) => {
  if (_navigator) {
    _navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params
      })
    )
  }
}

const navigateSimple = (navigation, routeName, params = {} ) => {
    if(navigation) {
      navigation.navigate(routeName, params)
    } else {
      navigateMainNavigator(routeName, params)
    }
}

export {
  navigateMainNavigator,
  setTopLevelNavigator,
  navigateSimple
}