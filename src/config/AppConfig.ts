import Reactotron from "reactotron-react-native";

const log = (...logData) => {
  Reactotron.log(logData)
}

export {
  log
}