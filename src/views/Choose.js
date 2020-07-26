import React from 'react'
import { View, Text, Button } from 'react-native'

const Choose = ({ navigation }) => {
    return (
        <View>
            <Text>Choose Type</Text>
            <View>
                <Button
                    onPress={() => navigation.navigate('AddFood')}
                    title="Add Food Entry"
                />
                <Button
                    onPress={() => navigation.navigate('AddDiary')}
                    title="Add Diary Entry"
                />
            </View>
        </View>
    )
}

export default Choose
