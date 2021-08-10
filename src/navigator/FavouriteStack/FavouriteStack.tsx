import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { FavouriteScreen, MovieDetailScreen, MovieListScreen, SearchScreen } from "../../screens"

const favStack = () => {

  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions = {{
      headerShown: false
    }}>
      <Stack.Screen name = {'favouriteScreen'} component = {FavouriteScreen}></Stack.Screen>
    </Stack.Navigator>
  )

}

export {
  favStack
}