import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

/**
 * Views
 */
import Home from './views/Home'
import Choose from './views/Choose'
import AddDiary from './views/AddDiary'
import AddFood from './views/AddFood'

/**
 * Top level navigation container
 */
const AppRouter = () => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
}

/**
 * Home stack navigator
 * Using native stack navigator, so we need to call 'enableScreens()'
 * This will use 'UINavigationController' for same performance benefits as native
 */
enableScreens()
const HomeNavigator = createNativeStackNavigator()
const HomeStack = () => {
    return (
        <HomeNavigator.Navigator initialRouteName="Home">
            <HomeNavigator.Screen name="Home" component={Home} />
            <HomeNavigator.Screen
                options={{
                    gesturesEnabled: true,
                    stackPresentation: 'formSheet',
                }}
                name="Choose"
                component={Choose}
            />
            <HomeNavigator.Screen
                options={{
                    gesturesEnabled: true,
                    stackPresentation: 'formSheet',
                }}
                name="AddFood"
                component={AddFood}
            />
            <HomeNavigator.Screen
                options={{
                    gesturesEnabled: true,
                    stackPresentation: 'formSheet',
                }}
                name="AddDiary"
                component={AddDiary}
            />
        </HomeNavigator.Navigator>
    )
}

export default AppRouter
