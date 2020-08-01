import moment from 'moment'

/**
 * Returns array of dates between two dates
 */
export const getDatesArray = (startDate, endDate) => {
    let dateArray = []
    let currentDate = moment(startDate)
    let stopDate = moment(endDate)
    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate))
        currentDate = moment(currentDate).add(1, 'days')
    }
    return dateArray
}
