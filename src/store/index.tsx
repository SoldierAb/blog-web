import { createStore, combineReducers } from 'redux'
import demoreducer from '../reducers/demoReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    demo: demoreducer
})

const StoreConfig = createStore(
    reducer,
    {},
    composeWithDevTools()
)

export default StoreConfig