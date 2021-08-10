import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { MovieDetailScreen, MovieListScreen, SearchScreen } from "../../screens"

const homeStack = () => {

  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions = {{
      headerShown: false
    }}>
      <Stack.Screen name = {'movieListScreen'} component = {MovieListScreen}></Stack.Screen>
    </Stack.Navigator>
  )

}

export {
  homeStack
}