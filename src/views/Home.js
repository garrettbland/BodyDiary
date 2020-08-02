import React, { useEffect } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'
import firestore from '@react-native-firebase/firestore'
import { SET_ENTRIES, SET_DATA_LOADED } from '../redux/constants'
import moment from 'moment-timezone'
import * as RNLocalize from 'react-native-localize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Home = ({ navigation }) => {
    /**
     *  React-redux hooks
     */
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
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
        <View style={tailwind('flex-1')}>
            <ScrollView
                style={{
                    paddingTop: insets.top,
                    ...tailwind('flex-1'),
                }}>
                <View style={tailwind('')}>
                    <Text style={tailwind('text-4xl')}>
                        All Entries
                    </Text>
                    <View>
                        {entries.map((entry) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditEntry', {
                                        entry: entry,
                                    })
                                }>
                                <Text
                                    style={tailwind('text-blue-500')}>
                                    {entry.value} (
                                    {entry.type === 'food'
                                        ? 'Food entry'
                                        : 'Diary entry'}
                                    ) (
                                    {moment(entry.date)
                                        .tz(RNLocalize.getTimeZone())
                                        .format('LLLL')}
                                    )
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={() => navigation.navigate('EntriesMenu')}
                style={{
                    marginBottom: insets.bottom,
                    marginLeft: insets.bottom,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,

                    elevation: 8,
                    ...tailwind(
                        'flex items-center justify-center absolute bottom-0 left-0 bg-orange-500 h-16 w-16 rounded-full'
                    ),
                }}>
                <Text>=</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Choose')}
                style={{
                    marginBottom: insets.bottom,
                    marginRight: insets.bottom,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,

                    elevation: 8,
                    ...tailwind(
                        'flex items-center justify-center absolute bottom-0 right-0 bg-orange-500 h-16 w-16 rounded-full'
                    ),
                }}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home
