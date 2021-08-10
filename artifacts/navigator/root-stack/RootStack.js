import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { MovieDetailScreen, SearchScreen } from "../../screens";
import { bottomTabBar } from '../bottom-tab/TabBar';
const rootStack = () => {
    const Stack = createStackNavigator();
    return (React.createElement(Stack.Navigator, { screenOptions: {
            headerShown: false
        } },
        React.createElement(Stack.Screen, { name: 'searchScreen', component: SearchScreen }),
        React.createElement(Stack.Screen, { name: 'tabBar', component: bottomTabBar }),
        React.createElement(Stack.Screen, { name: 'movieDetailScreen', component: MovieDetailScreen })));
};
export { rootStack };
