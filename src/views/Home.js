import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'

const Home = ({ navigation }) => {
    /**
     *  React-redux hooks
     */
    const entries = useSelector(state => state.entries)

    return (
        <View>
            <Text>Home View</Text>
            <View>
                <Text>All Entries</Text>
                <FlatList
                    data={entries}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Text style={tailwind('text-blue-500')}>
                            {item.value} (
                            {item.type === 'food'
                                ? 'Food Item'
                                : 'Diary Item'}
                            )
                        </Text>
                    )}
                />
            </View>
            <View>
                <Button
                    onPress={() => navigation.navigate('Choose')}
                    title='Open Modal'
                />
            </View>
        </View>
    )
}

export default Home
