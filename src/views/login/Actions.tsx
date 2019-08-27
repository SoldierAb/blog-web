import * as ActionTypes from './ActionTypes'
import {fetchPost} from '../../utils/fetchUtil'

export interface LoginData{
    username:string,
    password:string
}

export const signIn = (data:LoginData)=>{
    return {
        promise:fetchPost('blog/login',data).then(res=>{
            return res
        }),
        types:[ActionTypes.LOGIN_PENDING,ActionTypes.LOGIN_SUCCESS,ActionTypes.LOGIN_FAIL]
    }
}

