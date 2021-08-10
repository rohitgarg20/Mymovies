import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { MovieListScreen } from "../../screens";
const homeStack = () => {
    const Stack = createStackNavigator();
    return (React.createElement(Stack.Navigator, { screenOptions: {
            headerShown: false
        } },
        React.createElement(Stack.Screen, { name: 'movieListScreen', component: MovieListScreen })));
};
export { homeStack };
