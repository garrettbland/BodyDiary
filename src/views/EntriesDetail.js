import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment-timezone'
import * as RNLocalize from 'react-native-localize'

const EntriesDetail = ({ route, navigation }) => {
    /**
     *  React-redux hooks
     */
    const [isLoading, setIsLoading] = useState(true)
    const [entries, setEntries] = useState([])
    const user_id = useSelector((state) => state.user_id)

    /**
     * reference our entires collection
     */
    const entriesRef = firestore().collection('entries')

    useEffect(() => {
        fetch_entries()
    }, [])

    const fetch_entries = async () => {
        setIsLoading(true)
        entriesRef
            .where('user_id', '==', user_id)
            .where(
                'date',
                '>=',
                moment(route.params.date)
                    .utc()
                    .startOf('day')
                    .valueOf()
            )
            .where(
                'date',
                '<=',
                moment(route.params.date).utc().endOf('day').valueOf()
            )
            .get()
            .then((dataSnapshot) => {
                let items = []
                dataSnapshot.forEach((doc) => {
                    items.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                })

                setEntries(items)
                setIsLoading(false)
            })
    }

    return (
        <View>
            <Text>EntriesDetail View</Text>
            <Text>
                {moment(route.params.date)
                    .tz(RNLocalize.getTimeZone())
                    .format('LLLL')}
            </Text>
            <View>
                <Text>Entries</Text>

                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={entries}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditEntry', {
                                        fromDetail: true,
                                        refetchEntries: () =>
                                            fetch_entries(),
                                        entry: item,
                                    })
                                }>
                                <Text
                                    style={tailwind('text-blue-500')}>
                                    {item.value} (
                                    {item.type === 'food'
                                        ? 'Food Item'
                                        : 'Diary Item'}
                                    ) (
                                    {moment(item.date)
                                        .tz(RNLocalize.getTimeZone())
                                        .format('LLLL')}
                                    )
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    )
}

export default EntriesDetail
