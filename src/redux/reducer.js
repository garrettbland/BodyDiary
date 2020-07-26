import { ADD_FOOD_ITEM, ADD_DIARY_ITEM } from './constants'

/**
 * Define initial state
 */
const initialState = {
    food_items: [],
    diary_items: [],
}

/**
 * Define our reducer
 * Sets `state` to our initialState if `state` is undefined
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOOD_ITEM: {
            /**
             * Set id automatically and get value from payload
             */
            const new_item = {
                id: Date.now().toString(),
                value: action.payload.value,
            }

            return {
                ...state,
                food_items: [...state.food_items, new_item],
            }
        }
        case ADD_DIARY_ITEM: {
            /**
             * Set id automatically and get value from payload
             */
            const new_item = {
                id: Date.now().toString(),
                value: action.payload.value,
            }

            return {
                ...state,
                diary_items: [...state.diary_items, new_item],
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
