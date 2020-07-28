import React, { useState } from 'react'
import tailwind from 'tailwind-rn'
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
} from 'react-native'
import { ADD_ENTRY } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment-timezone'

const AddDiary = ({ navigation }) => {
    /**
     * Define dispatch hook
     */
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.user_id)

    /**
     * Use react hooks to keep track of text value state
     */
    const [value, setValue] = useState('')
    const [selectedDate, setSelectedDate] = useState(
        moment().utc().valueOf()
    )

    /**
     * reference our entires collection
     */
    const entriesRef = firestore().collection('entries')

    const save_item_to_database = async () => {
        try {
            const docRef = await entriesRef.add({
                user_id: user_id,
                type: 'diary',
                value: value,
                date: selectedDate,
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

    const add_item = () => {
        /**
         * Save item to firebase
         */
        save_item_to_database().then((docRef) => {
            /**
             * Dispatches the redux action to add item to store
             */
            dispatch({
                type: ADD_ENTRY,
                payload: {
                    id: docRef.id,
                    user_id: user_id,
                    type: 'diary',
                    value: value,
                    date: selectedDate,
                },
            })

            /**
             * Pops navigation to close modal
             */
            navigation.pop()
        })
    }

    return (
        <KeyboardAvoidingView
            style={tailwind('flex flex-col h-full')}
            behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={tailwind('flex-grow')}>
                    <Text>Add Diary Entry</Text>
                    <TextInput
                        style={tailwind('border')}
                        value={value}
                        placeholder="Text Entry"
                        onChangeText={(text) => setValue(text)}
                        autoFocus={true}
                        clearButtonMode="always"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="done"
                        onSubmitEditing={() => add_item()}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={tailwind('h-24')}>
                <Button title="Add Item" onPress={() => add_item()} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddDiary
