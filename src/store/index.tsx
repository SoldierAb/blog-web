import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promise'
import demoreducer from '../reducers/demoReducer'
import {reducer as loginReducer} from '../views/login'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    demo: demoreducer,
    login:loginReducer
})


const middlewares = [promiseMiddleware];

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    composeWithDevTools()
);


const StoreConfig = createStore(
    reducer,
    {},
    storeEnhancers
)

export default StoreConfig