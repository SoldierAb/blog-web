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
        case ActionTypes.LOGIN_SUCCESS:    //登陆成功返回当前用户名
            return {...state,status:LoginStatus.LOGGEDIN,username:res.data.username}
        case ActionTypes.LOGIN_PENDING:
            return {...state,status:LoginStatus.NOTLOGGED}    
        case ActionTypes.LOGIN_FAIL:
            return {...state,status:LoginStatus.NOTLOGGED}    
        default:
            return state    
    }
}