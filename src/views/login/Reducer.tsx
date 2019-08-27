import * as ActionTypes from './ActionTypes'
import * as LoginStatus from './Status'
import {Login} from './Store'

const initState = {
    status:LoginStatus.NOTLOGGED
}

export default (state:Login = initState,action:any)=>{
    const {type,res} = action;
    console.log(type,res);
    switch(type){
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,status:LoginStatus.LOGGEDIN,...res}
        case ActionTypes.LOGIN_PENDING:
            return {...state,status:LoginStatus.NOTLOGGED}    
        case ActionTypes.LOGIN_FAIL:
            return {...state,status:LoginStatus.NOTLOGGED}    
        default:
            return state    
    }
}