import React from 'react';
import {connect} from 'react-redux';
import {StoreState,loading} from '../Store'

const mapState = (state:StoreState)=> {
    return {
        loadingshow:state.loading.loadingshow
    }
}

const Loading = ({ loadingshow }:loading) => {
    if (!loadingshow) return <div></div>
    return (
            <div id="loading-gui-box" className="loading-gui-box">
                <div className="containerBox backgroundTM">
                    <div className="loading-container">
                        <div className="loading-box">
                            <div className="k-line k-line11-1" ></div>
                            <div className="k-line k-line11-2" ></div>
                            <div className="k-line k-line11-3" ></div>
                            <div className="k-line k-line11-4" ></div>
                            <div className="k-line k-line11-5" ></div>
                        </div>
                    </div>
                </div>
            </div>
    );
}


export default connect(mapState)(Loading);