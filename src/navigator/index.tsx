import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import { bottomTabBar } from './bottom-tab/TabBar'
import { navigationStore } from '../store'
import { SearchScreen } from '../screens'
import { rootStack } from './root-stack'
import { log } from '../config'
import { setTopLevelNavigator } from '../service'

const getMainStack = () => {
  const Stack = createStackNavigator()
  const { currentStackName } = navigationStore
  return (
    <NavigationContainer
    ref = {(value) => setTopLevelNavigator(value)}
    >
      <Stack.Navigator screenOptions = {{
        headerShown: false
      }}>
        {currentStackName === 'rootStack' && <Stack.Screen name = {'rootStack'} component = {rootStack}></Stack.Screen>}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const routerGenerator = () => {
  navigationStore.setCurrentStackName('rootStack')
  navigationStore.setRouter(getMainStack)
}

export {
  routerGenerator
}