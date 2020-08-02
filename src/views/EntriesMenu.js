import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import tailwind from 'tailwind-rn'
import { getDatesArray } from '../utils/dates'
import moment from 'moment-timezone'
import * as RNLocalize from 'react-native-localize'

const EntriesMenu = ({ navigation }) => {
    const [dates, setDates] = useState([])

    useEffect(() => {
        let startDate = moment().subtract(7, 'days')
        let endDate = moment()
        let datesArray = getDatesArray(startDate, endDate)
        setDates(datesArray)
    }, [])

    return (
        <View>
            <Text>Entries Menu</Text>
            <FlatList
                data={dates}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EntriesDetail', {
                                date: moment(item).tz(
                                    RNLocalize.getTimeZone()
                                ),
                            })
                        }>
                        <Text style={tailwind('text-blue-500')}>
                            {moment(item)
                                .tz(RNLocalize.getTimeZone())
                                .format('dddd, MMMM Do')}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default EntriesMenu
