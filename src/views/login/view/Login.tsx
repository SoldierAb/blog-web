import React from 'react';
import { connect } from 'react-redux'
import "./login.scss"
import * as Actions from '../Actions'
import * as LoginStatusTypes from '../Status'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item

class NormalLoginForm extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err: any, values: object) => {
            if (!err) {
                _this.props.clickSignIn(values);
            }
        });
    }

    componentDidUpdate() {
        if (this.props.loginStatus === LoginStatusTypes.NOTLOGGED) {
            console.log('未登录');
        }
        if (this.props.loginStatus === LoginStatusTypes.LOGGEDIN) {
            // this.props.history.push('/home');
        }
    }

    render(): any {
        const { getFieldDecorator } = this.props.form;
        const isLogin = this.props.loginStatus === LoginStatusTypes.LOGGEDIN ? true : false;
        if (isLogin) {
            return <div>亲爱的~</div>;
        }
        return (
            <div className="login-container">
                <Form className="loginBox" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);

const mapDispatch = (dispatch: any) => {
    return {
        clickSignIn: (obj: Actions.LoginData) => {
            dispatch(Actions.signIn(obj))
        }
    }
}

const mapState = (state: any) => {
    return {
        loginStatus: state.login.status,
    }
}

export default connect(mapState, mapDispatch)(Login);