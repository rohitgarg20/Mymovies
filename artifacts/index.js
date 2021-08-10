import { AppRegistry } from 'react-native';
import { App } from './App';
import('./config/ReactotronConfig').then(() => {
    console.log('reactotron configured');
});
AppRegistry.registerComponent("MyMovie", () => App);
