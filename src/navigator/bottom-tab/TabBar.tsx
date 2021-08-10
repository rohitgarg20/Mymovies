import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { FavouriteScreen } from '../../screens'
import { favStack } from '../FavouriteStack'
import { homeStack } from '../HomeStack'

const bottomTabBar = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator screenOptions = {{
      headerShown: false
    }}>
      <Tab.Screen name = {'home'} component = {homeStack}/>
      <Tab.Screen name = {'myFavMovies'} component = {favStack}/>
    </Tab.Navigator>
  )
}

export {
  bottomTabBar
}