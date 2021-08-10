import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { favStack } from '../FavouriteStack';
import { homeStack } from '../HomeStack';
const bottomTabBar = () => {
    const Tab = createBottomTabNavigator();
    return (React.createElement(Tab.Navigator, { screenOptions: {
            headerShown: false
        } },
        React.createElement(Tab.Screen, { name: 'home', component: homeStack }),
        React.createElement(Tab.Screen, { name: 'myFavMovies', component: favStack })));
};
export { bottomTabBar };
