import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'

const Home = ({ navigation }) => {
    /**
     *  React-redux hooks
     */
    const food_items = useSelector((state) => state.food_items)
    const diary_items = useSelector((state) => state.diary_items)

    return (
        <View>
            <Text>Home View</Text>
            <View>
                <Text>Food Items</Text>
                <FlatList
                    data={food_items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text style={tailwind('text-blue-500')}>
                            {item.value}
                        </Text>
                    )}
                />
            </View>
            <View>
                <Text>Diary Items</Text>
                <FlatList
                    data={diary_items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text style={tailwind('text-red-500')}>
                            {item.value}
                        </Text>
                    )}
                />
            </View>
            <View>
                <Button
                    onPress={() => navigation.navigate('Choose')}
                    title="Open Modal"
                />
            </View>
        </View>
    )
}

export default Home
