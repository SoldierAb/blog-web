import Demo from './Demo'
import * as Actions from '../../../actions/demo'
import { StoreState } from '../../../entity/index'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'


const mapState = (state: StoreState) => {
    console.log(state);
    return {
        languageName:state.demo.languageName,
        level:state.demo.level
    }
}


const mapDispatch = (dispatch: Dispatch) => {
    return {
        onIncre: () => dispatch(Actions.increAction()),
        onDecre: () => dispatch(Actions.decreAction())
    }
}


export default connect(mapState, mapDispatch)(Demo)