import * as ActionTypes from './ActionTypes';

interface SHOW {
    type: ActionTypes.LOADING_SHOW,
}

interface HIDE {
    type: ActionTypes.LOADING_HIDE,
}


export type All  = SHOW | HIDE; 

export const loading_show = (): SHOW => {
    return {
        type: ActionTypes.LOADING_SHOW,
    }
}

export const loading_hide = (): HIDE => ({
    type: ActionTypes.LOADING_HIDE,
})