import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { MovieDetailScreen, MovieListScreen, SearchScreen } from "../../screens"
import { bottomTabBar } from '../bottom-tab/TabBar'

const rootStack = () => {

  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions = {{
      headerShown: false
    }}>
      <Stack.Screen name = {'searchScreen'} component = {SearchScreen}></Stack.Screen>
      <Stack.Screen name = {'tabBar'} component = {bottomTabBar}/>
      <Stack.Screen name = {'movieDetailScreen'} component = {MovieDetailScreen}></Stack.Screen>
    </Stack.Navigator>
  )

}

export {
  rootStack
}