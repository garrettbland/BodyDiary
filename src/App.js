import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Router from './Router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { generateRandomId, getItem, setItem } from './utils/storage'
import { SET_USER_ID } from './redux/constants'

/**
 * Key name's
 */
const USER_ID = '@user_id'

const App = () => {
    /**
     * Set initial state with react hooks when app starts
     */
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        /**
         * First, check to see if user id key exists in storage
         */
        getItem(USER_ID).then((value) => {
            if (value) {
                /**
                 * User id is already set, add to our redux store
                 * and contiue with app
                 */
                store.dispatch({
                    type: SET_USER_ID,
                    payload: {
                        user_id: value,
                    },
                })
                setIsLoading(false)
            } else {
                /**
                 * Value returned null, so it must not be set yet
                 * Create a new key with random uuid value
                 */
                let random_id = generateRandomId()
                setItem({
                    key: USER_ID,
                    value: random_id,
                }).then(() => {
                    /**
                     * User id saved, add to redux store and continue with
                     * app
                     */
                    store.dispatch({
                        type: SET_USER_ID,
                        payload: {
                            user_id: random_id,
                        },
                    })
                    setIsLoading(false)
                })
            }
        })
    }, [])

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default App
