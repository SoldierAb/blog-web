import { All } from '../actions/demo'
import { demo } from '../entity/index'
import * as contants from '../contants/demo'

const initState = {
    level: 1,
    languageName: 'typescript'
}

export function demoReducer(state: demo = initState, action: All): demo {
    switch (action.type) {
        case contants.DECREMENT_ACTION_TYPE:
            return { ...state, level: state.level - 1 };
        case contants.INCREMENT_ACTION_TYPE:
            return { ...state, level: state.level + 1 }
        default:
            return state
    }
}