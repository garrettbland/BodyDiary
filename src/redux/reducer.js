import { ADD_ENTRY } from './constants'

/**
 * Define initial state
 */
const initialState = {
    user_id: '12345', // we will generate/retreive the uuid later
    entries: [], // our diary and food entries
}

/**
 * Define our reducer
 * Sets `state` to our initialState if `state` is undefined
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ENTRY: {
            /**
             * Add item to entires
             */
            const new_item = {
                user_id: state.user_id,
                type: action.payload.type,
                value: action.payload.value,
            }

            return {
                ...state,
                entries: [...state.entries, new_item],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default rootReducer
