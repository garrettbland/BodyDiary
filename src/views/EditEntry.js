import React, { useState, useEffect } from 'react'
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
import { EDIT_ENTRY, REMOVE_ENTRY } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment-timezone'

const EditEntry = ({ route, navigation }) => {
    /**
     * Define dispatch hook
     */
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.user_id)

    /**
     * Use react hooks to keep track of text value state
     */
    const [value, setValue] = useState(route.params.entry.value)
    const [selectedDate, setSelectedDate] = useState(
        moment().utc().valueOf()
    )

    /**
     * reference our entires collection
     */
    const entriesRef = firestore().collection('entries')

    const update_document_in_database = async () => {
        try {
            const docId = route.params.entry.id
            const docRef = await entriesRef.doc(docId).update({
                value: value,
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

    const delete_document_in_database = async () => {
        try {
            const docId = route.params.entry.id
            const docRef = await entriesRef.doc(docId).delete()

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

    const edit_item = () => {
        /**
         * Edit item in database
         */
        update_document_in_database().then((docRef) => {
            /**
             * Dispatch action to edit item in redux store
             */
            dispatch({
                type: EDIT_ENTRY,
                payload: {
                    entry: {
                        ...route.params.entry,
                        value: value,
                    },
                },
            })

            if (route.params.fromDetail === true) {
                route.params.refetchEntries()
            }

            /**
             * Pops navigation to close modal
             */
            navigation.pop()
        })
    }

    const remove_item = () => {
        delete_document_in_database().then((docRef) => {
            dispatch({
                type: REMOVE_ENTRY,
                payload: {
                    entry: route.params.entry,
                },
            })

            if (route.params.fromDetail === true) {
                route.params.refetchEntries()
            }

            navigation.pop()
        })
    }

    return (
        <KeyboardAvoidingView
            style={tailwind('flex flex-col h-full')}
            behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={tailwind('flex-grow')}>
                    <Text>Edit Entry</Text>
                    <TextInput
                        style={tailwind('border')}
                        value={value}
                        placeholder="Text Entry"
                        onChangeText={(text) => setValue(text)}
                        autoFocus={true}
                        clearButtonMode="always"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="done"
                        onSubmitEditing={() => edit_item()}
                    />
                    <Button
                        title="Delete Entry"
                        onPress={() => remove_item()}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={tailwind('h-24')}>
                <Button
                    title="Edit Item"
                    onPress={() => edit_item()}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditEntry
