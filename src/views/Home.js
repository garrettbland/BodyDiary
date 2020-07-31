import React, { useEffect } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'
import firestore from '@react-native-firebase/firestore'
import { SET_ENTRIES, SET_DATA_LOADED } from '../redux/constants'
import moment from 'moment-timezone'
import * as RNLocalize from 'react-native-localize'

const Home = ({ navigation }) => {
    /**
     *  React-redux hooks
     */
    const dispatch = useDispatch()
    const hasDataLoaded = useSelector((state) => state.hasDataLoaded)
    const entries = useSelector((state) => state.entries)
    const user_id = useSelector((state) => state.user_id)

    /**
     * reference our entires collection
     */
    const entriesRef = firestore().collection('entries')

    useEffect(() => {
        /**
         * If data has already been loaded by firebase, don't send
         * another network request. Entires are in redux store
         * Moment includes valueOf to get timestamp in millieseconds
         */
        if (!hasDataLoaded) {
            entriesRef
                .where('user_id', '==', user_id)
                .where(
                    'date',
                    '>=',
                    moment().utc().startOf('day').valueOf()
                )
                .where(
                    'date',
                    '<=',
                    moment().utc().endOf('day').valueOf()
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

                    /**
                     * Update our entires with results from firebase
                     */
                    dispatch({
                        type: SET_ENTRIES,
                        payload: {
                            entries: items,
                        },
                    })

                    /**
                     * Set hasDataLoaded flag to true in redux to
                     * limit network requests
                     */
                    dispatch({
                        type: SET_DATA_LOADED,
                    })
                })
        }
    }, [])

    return (
        <View>
            <Text>Home View</Text>
            <View>
                <Text>All Entries</Text>
                {hasDataLoaded && (
                    <FlatList
                        data={entries}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditEntry', {
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
            <View>
                <Text>User Id: {JSON.stringify(user_id)}</Text>
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
