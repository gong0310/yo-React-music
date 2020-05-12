import { createStore, combineReducers } from "redux";
function playlist(state = [], action) {
    switch (action.type) {
        case 'ADDMUSIC':
            return [action.music, ...state]
        case 'CLEARINDEX':
            return [...state.filter(t => t.id !== action.id)]
        default:
            return state
    }
}
function play(state=true, action) {
    switch (action.type) {
        case 'TOGGLE':
            return !state
        default:
            return state
    }
}
function playedSeconds(state=0, action){
    switch (action.type) {
        case 'SECONDS':
            return action.seconds
        default:
            return state
    }
}

const count = combineReducers({
    playlist,
    play,
    playedSeconds
    // index
})
const store = createStore(count)
export default store