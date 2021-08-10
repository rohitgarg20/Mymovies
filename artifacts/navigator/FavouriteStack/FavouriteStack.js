import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { FavouriteScreen } from "../../screens";
const favStack = () => {
    const Stack = createStackNavigator();
    return (React.createElement(Stack.Navigator, { screenOptions: {
            headerShown: false
        } },
        React.createElement(Stack.Screen, { name: 'favouriteScreen', component: FavouriteScreen })));
};
export { favStack };
