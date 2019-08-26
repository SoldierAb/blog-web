import * as constants from '../contants/demo'

export interface IncreAction{
    type:constants.INCREMENT_ACTION_TYPE
}

export interface DecreAction {
    type:constants.DECREMENT_ACTION_TYPE
}

export type All = IncreAction | DecreAction

export function increAction():IncreAction{
    return {
        type:constants.INCREMENT_ACTION_TYPE
    }
}

export function decreAction():DecreAction{
    return {
        type:constants.DECREMENT_ACTION_TYPE
    }
}

