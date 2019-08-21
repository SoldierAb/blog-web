import {message} from 'antd';
import * as LoadingTypes from '../components/loading/ActionTypes';

const isPromise = (obj) => {
    return obj && typeof obj.then === 'function'
}

const promiseMiddleware = ({ dispatch }) => {
    return (next) => (action) => {
        const { promise, types, ...rest } = action;
        if (!isPromise(promise) || !(types && types.length === 3)) {
            return next(action);
        }

        const [PENDING, DONE, FAIL] = types;

        dispatch({ type: PENDING, ...rest });
        dispatch({ type: LoadingTypes.LOADING_SHOW});
        return promise.then(
            (res) => {
                dispatch({ type: LoadingTypes.LOADING_HIDE})
                if (res.code === 200) {
                    message.info(res.msg,2);
                   return dispatch({ type: DONE, res, ...rest });
                } else {
                    message.warning(res.msg,2);
                    return dispatch({ type: FAIL, res, ...rest });
                }
            },
            (err) =>{
                dispatch({ type: LoadingTypes.LOADING_HIDE})
                message.error(err);
                return dispatch({ type: FAIL, err, ...rest })
            }
        )
    }
}

export default promiseMiddleware;