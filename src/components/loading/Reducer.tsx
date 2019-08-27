import * as ActionTypes from './ActionTypes'
import { All } from './Actions'
import { loading } from './Store'

const initState = {
    loadingshow: false,
}

export default (state: loading = initState, action: All) => {
    const { type } = action;
    switch (type) {
        case ActionTypes.LOADING_HIDE:
            return { loadingshow: state.loadingshow = false }
        case ActionTypes.LOADING_SHOW:
            return { loadingshow: state.loadingshow = true }
        default:
            return state;
    }
}