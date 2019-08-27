import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
   0%{
       opacity:0;
       right:0;
    }

   100%{
       opacity:100%;
       right:30px;
   }
`;

const Wrapper = styled.div`
    position:fixed;
    width:200px;
    height:50px;
    top:20px;
    right:20px;
    background:white;
    z-index:10000;
    box-shadow:2px 2px 5px #888888;;
    animation:${fadeIn} 200ms ease-out;
`;




export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    componentDidMount() {
        if (!this.props.duration) return this.toastShow(1500);
        this.toastShow(this.props.duration)
    }

    toastShow(duration) {
        this.timer = setTimeout(() => {
            this.setState({
                show: false
            })
        }, duration);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    render() {
        const { show } = this.state;
        const { text } = this.props;
        return (
            <Wrapper style={show ? { display: 'block' } : { display: 'none' }}>
                {text}
            </Wrapper>
        );
    }
}