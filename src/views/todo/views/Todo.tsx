import Demo from './Demo'
import * as Actions from '../../../actions/demo'
import {StoreState} from '../../../entity/index'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'


export function mapState({demo:{languageName,level}}:StoreState){
    return {languageName,level}
}


export function mapDispatch(dispatch:Dispatch){
    return {
        onIncre:()=>dispatch(Actions.increAction()),
        onDecre:()=>dispatch(Actions.decreAction())
    }
}


export function mergeProps(stateProps:any,dispatchProps:any,ownProps:any){
    return {...stateProps,...dispatchProps,...ownProps}
}

export default connect(mapState,mapDispatch,mergeProps)(Demo)