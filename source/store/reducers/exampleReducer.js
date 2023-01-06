const CHECK_PLAYER_STATUS = 'CHECK_PLAYER_STATUS';

const defaultState = {
    ready: false,
}

export default function exampleReducer(state = defaultState, action) {
    switch (action.type) {

        case CHECK_PLAYER_STATUS:
            return {
                ...state,
                ready: action.payload
            }

        default:
            return state;
    }
}

// export const checkReduxStatus = (counter) => ({ type: CHECK_PLAYER_STATUS, payload: true })
