/**
 * Created by Li on 2017/3/17.
 */
import {fromJS} from "immutable"
const STATE_KEY = "CHAT_APP_STATE"
export function saveToStorage(state) {
    let data = JSON.stringify(state.toJS ? state.toJS() : state)
    localStorage.setItem(STATE_KEY, data)
}

export function getInitialState() {
    let stateString = localStorage.getItem(STATE_KEY)
    if (!stateString) {
        return fromJS({rooms: [], messages: {}, username: prompt("用户名")})
    }
    return fromJS(JSON.parse(stateString))
}