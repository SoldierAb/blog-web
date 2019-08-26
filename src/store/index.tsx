import {createStore, combineReducers} from 'redux'
import rootReducer from '../reducers/rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const StoreConfig = createStore(
        rootReducer,
        composeWithDevTools()
    )

export default StoreConfig