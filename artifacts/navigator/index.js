import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { navigationStore } from '../store';
import { rootStack } from './root-stack';
import { setTopLevelNavigator } from '../service';
const getMainStack = () => {
    const Stack = createStackNavigator();
    const { currentStackName } = navigationStore;
    return (React.createElement(NavigationContainer, { ref: (value) => setTopLevelNavigator(value) },
        React.createElement(Stack.Navigator, { screenOptions: {
                headerShown: false
            } }, currentStackName === 'rootStack' && React.createElement(Stack.Screen, { name: 'rootStack', component: rootStack }))));
};
const routerGenerator = () => {
    navigationStore.setCurrentStackName('rootStack');
    navigationStore.setRouter(getMainStack);
};
export { routerGenerator };
