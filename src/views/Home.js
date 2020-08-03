import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import tailwind, { getColor } from 'tailwind-rn'
import firestore from '@react-native-firebase/firestore'
import { SET_ENTRIES, SET_DATA_LOADED } from '../redux/constants'
import moment from 'moment-timezone'
import * as RNLocalize from 'react-native-localize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'

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
                <View>
                    <View style={tailwind('px-4 mb-12 mt-4')}>
                        <Text
                            style={tailwind(
                                'font-bold text-gray-600 text-xl'
                            )}>
                            {moment().format('dddd ll')}
                        </Text>
                        <Text style={tailwind('text-5xl font-black')}>
                            Body Diary
                        </Text>
                    </View>
                    <View style={tailwind('mb-24')}>
                        <Text
                            style={{
                                letterSpacing: 1,
                                ...tailwind(
                                    'text-gray-600 px-4 uppercase mb-2'
                                ),
                            }}>
                            🥗 Food Entries
                        </Text>
                        <View
                            style={tailwind(
                                'h-px bg-gray-300 w-full'
                            )}
                        />
                        {entries.map((entry, index) => {
                            if (entry.type === 'food') {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={tailwind(
                                            'border-b border-gray-300 py-2'
                                        )}
                                        onPress={() =>
                                            navigation.navigate(
                                                'EditEntry',
                                                {
                                                    entry: entry,
                                                }
                                            )
                                        }>
                                        <Text
                                            style={tailwind(
                                                'px-4 py-2 text-lg'
                                            )}>
                                            {entry.value}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                    <View>
                        <Text
                            style={{
                                letterSpacing: 1,
                                ...tailwind(
                                    'text-gray-600 px-4 uppercase mb-2'
                                ),
                            }}>
                            📝 Diary Entries
                        </Text>
                        <View
                            style={tailwind(
                                'h-px bg-gray-300 w-full'
                            )}
                        />
                        {entries.map((entry, index) => {
                            if (entry.type === 'diary') {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={tailwind(
                                            'border-b border-gray-300 py-2'
                                        )}
                                        onPress={() =>
                                            navigation.navigate(
                                                'EditEntry',
                                                {
                                                    entry: entry,
                                                }
                                            )
                                        }>
                                        <Text
                                            style={tailwind(
                                                'px-4 py-2 text-lg'
                                            )}>
                                            {entry.value}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={() => navigation.navigate('EntriesMenu')}
                style={{
                    marginBottom: insets.bottom,
                    marginLeft: insets.bottom,
                    shadowColor: getColor('indigo-900'),
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.65,
                    elevation: 16,
                    borderRadius: 21,
                    ...tailwind(
                        'flex items-center justify-center absolute bottom-0 left-0 bg-indigo-500 h-16 w-16'
                    ),
                }}>
                <Icon
                    name="menu"
                    size={30}
                    style={tailwind('text-indigo-100')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Choose')}
                style={{
                    marginBottom: insets.bottom,
                    marginRight: insets.bottom,
                    shadowColor: getColor('green-500'),
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.65,
                    elevation: 16,
                    borderRadius: 21,
                    ...tailwind(
                        'flex items-center justify-center absolute bottom-0 right-0 bg-green-500 h-16 w-16'
                    ),
                }}>
                <Icon
                    name="plus"
                    size={32}
                    style={tailwind('text-white')}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Home
