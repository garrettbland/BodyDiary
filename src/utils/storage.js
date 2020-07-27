import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-community/async-storage'

export const generateRandomId = () => {
    /**
     * Genereate unique id and return
     * Need to install react-native-get-random-values and
     * follow instructions for polyfill to use uuid
     */
    return uuidv4()
}

export const setItem = async ({ key, value }) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        /**
         * set error
         */
    }
}

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            /**
             * Value with key is in storage
             */
            return JSON.parse(value)
        } else {
            /**
             * Nothing in storage matching that key
             */
            return null
        }
    } catch (err) {
        /**
         * get error
         */
    }
}
