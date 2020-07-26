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
import { ADD_FOOD_ITEM } from '../redux/constants'
import { useDispatch } from 'react-redux'

const AddFood = ({ navigation }) => {
    /**
     * Define dispatch hook
     */
    const dispatch = useDispatch()

    /**
     * Use react hooks to keep track of text value state
     */
    const [value, setValue] = useState('')

    const add_item = () => {
        /**
         * Dispatches the redux action to add item to store
         */
        dispatch({
            type: ADD_FOOD_ITEM,
            payload: {
                value: value,
            },
        })

        /**
         * Pops navigation to close modal
         */
        navigation.pop()
    }

    return (
        <KeyboardAvoidingView
            style={tailwind('flex flex-col h-full')}
            behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={tailwind('flex-grow')}>
                    <Text>Add Food Entry</Text>
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

export default AddFood
