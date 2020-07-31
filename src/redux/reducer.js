import {
    ADD_ENTRY,
    SET_USER_ID,
    SET_DATA_LOADED,
    SET_ENTRIES,
    EDIT_ENTRY,
} from './constants'

/**
 * Define initial state
 */
const initialState = {
    user_id: '', // we will generate/retreive the uuid later
    hasDataLoaded: false,
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
                id: action.payload.id,
                type: action.payload.type,
                value: action.payload.value,
                date: action.payload.date,
            }

            return {
                ...state,
                entries: [...state.entries, new_item],
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                user_id: action.payload.user_id,
            }
        }
        case SET_DATA_LOADED: {
            return {
                ...state,
                hasDataLoaded: true,
            }
        }
        case SET_ENTRIES: {
            return {
                ...state,
                entries: action.payload.entries,
            }
        }
        case EDIT_ENTRY: {
            const updated_entries = state.entries.map((entry) => {
                if (entry.id === action.payload.entry.id) {
                    return action.payload.entry
                } else {
                    return entry
                }
            })
            return {
                ...state,
                entries: updated_entries,
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
