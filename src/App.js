import React, { useState, useEffect } from 'react'
import { View, Text, Platform } from 'react-native'
import Router from './Router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { generateRandomId, getItem, setItem } from './utils/storage'
import { SET_USER_ID } from './redux/constants'
import firestore from '@react-native-firebase/firestore'

/**
 * Key name's
 */
const USER_ID = '@user_id'

const App = () => {
    /**
     * Set initial state with react hooks when app starts
     */
    const [isLoading, setIsLoading] = useState(true)

    /**
     * Our firestore users ref
     */
    const userRef = firestore().collection('users')

    const create_new_user = async () => {
        try {
            /**
             * We will store the platform for now
             */
            const docRef = await userRef.add({
                plaform: Platform.OS,
            })

            /**
             * Returns document reference object, which contains the new id
             */
            return docRef
        } catch (err) {
            /**
             * Handle error
             */
        }
    }

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
                 * Value returned null, so we will create a new user
                 * entry and assign id from firestore
                 */
                create_new_user().then((docRef) => {
                    setItem({
                        key: USER_ID,
                        value: docRef.id,
                    }).then(() => {
                        /**
                         * User id saved, add to redux store and continue with
                         * app
                         */
                        store.dispatch({
                            type: SET_USER_ID,
                            payload: {
                                user_id: docRef.id,
                            },
                        })
                        setIsLoading(false)
                    })
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
