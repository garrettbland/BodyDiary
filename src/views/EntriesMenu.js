import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { getDatesArray } from '../utils/dates'
import moment from 'moment'

const EntriesMenu = ({ navigation }) => {
    const [dates, setDates] = useState([])

    useEffect(() => {
        let startDate = moment()
        let endDate = moment().add(7, 'days')
        console.log(getDatesArray(startDate, endDate))
    }, [])

    return (
        <View>
            <Text>Entries Menu</Text>
            <View>
                <Button
                    title="Open Entries Detail"
                    onPress={() =>
                        navigation.navigate('EntriesDetail')
                    }
                />
            </View>
        </View>
    )
}

export default EntriesMenu
