import * as ActionTypes from './ActionTypes'
import {fetchPost} from '../../utils/fetchUtil'
import {API_CONFIG} from '../../config'

export interface LoginData{
    username:string,
    password:string
}

export const signIn = (data:LoginData)=>{
    return {
        promise:fetchPost(API_CONFIG.ADMIN_LOGIN,data).then(res=>{
            return res
        }),
        types:[ActionTypes.LOGIN_PENDING,ActionTypes.LOGIN_SUCCESS,ActionTypes.LOGIN_FAIL]
    }
}

