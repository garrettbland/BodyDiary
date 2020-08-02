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
import EditEntry from './views/EditEntry'
import EntriesMenu from './views/EntriesMenu'
import EntriesDetail from './views/EntriesDetail'

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
 *  Using native stack navigators, so we need to call 'enableScreens()'
 */
enableScreens()

/**
 * Home stack navigator
 * This will use 'UINavigationController' for same performance benefits as native
 */
const HomeNavigator = createNativeStackNavigator()
const HomeStack = () => {
    return (
        <HomeNavigator.Navigator initialRouteName="Home">
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <HomeNavigator.Screen
                options={{
                    gesturesEnabled: true,
                    stackPresentation: 'formSheet',
                }}
                name="EntriesMenu"
                component={EntriesStack}
            />
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
            <HomeNavigator.Screen
                options={{
                    gesturesEnabled: true,
                    stackPresentation: 'formSheet',
                }}
                name="EditEntry"
                component={EditEntry}
            />
        </HomeNavigator.Navigator>
    )
}

/**
 * Entries Menu Navigator
 * This will use 'UINavigationController' for same performance benefits as native
 */
const EntriesNavigator = createNativeStackNavigator()
const EntriesStack = () => {
    return (
        <EntriesNavigator.Navigator initialRouteName="EntriesMenu">
            <EntriesNavigator.Screen
                name="EntriesMenu"
                component={EntriesMenu}
            />
            <EntriesNavigator.Screen
                options={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerHideShadow: true,
                    gestureEnabled: true,
                    headerBackTitle: 'Back',
                    stackPresentation: 'push',
                    headerTitle: '',
                }}
                name="EntriesDetail"
                component={EntriesDetail}
            />
        </EntriesNavigator.Navigator>
    )
}

export default AppRouter
