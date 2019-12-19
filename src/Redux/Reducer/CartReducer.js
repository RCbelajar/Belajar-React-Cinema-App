const INITIAL_STATE = 0;

export const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COUNT_CART':
            return action.payload
        default:
            return state
    }
}