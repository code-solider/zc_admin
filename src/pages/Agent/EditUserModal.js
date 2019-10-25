import React, { Component } from 'react';
import { Modal, Button, Form, Icon, Input, DatePicker, Row, Col, message } from 'antd';
import PropTypes from 'prop-types';
import { add_user } from '@/services/api';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
moment.locale('zh-cn');

@connect(({ agent }) => ({
    agent
}))
class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.end_time = values.end_time.format('YYYY-MM-DD HH:mm:ss');
                let { dispatch, agent } = this.props;
                values.ids = agent.updateUserInfo.id;
                dispatch({
                    type: 'agent/updateUser',
                    payload: values
                })
                dispatch({
                    type: 'agent/getUserInfo'
                })
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    }

    componentDidMount() {
        this.props.form.resetFields()
    }

    checkData = (rule, value, callback) => {
        if (value) {
            if (/[\u4E00-\u9FA5]/g.test(value)) {
                callback(new Error('只可输入字母、不能输入汉字!'));
            } else {
                callback(

                );
            }
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4, offset: 2 },
            wrapperCol: { span: 14, offset: 1 },
        };

        let { agent: { updateUserInfo } } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" {...formItemLayout}>
                <Form.Item label="用户名称">
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '输入用户名称!' }, { validator: this.checkData }],
                        initialValue: updateUserInfo.nickname
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名称"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="手机号码">
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: '输入手机号码!' }],
                        initialValue: updateUserInfo.mobile
                    })(
                        <Input
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="手机号码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="登陆密码">
                    {getFieldDecorator('password', {
                        rules: [{ validator: this.checkData }],
                    })(
                        <Input
                            prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="登录密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="到期时间">
                    {getFieldDecorator('end_time', {
                        rules: [{ type: 'object', required: true, message: '选择到期时间!' }],
                        initialValue: moment(updateUserInfo.end_time, 'YYYY-MM-DD HH:mm:ss')
                    })(
                        <DatePicker showTime />,
                    )}
                </Form.Item>
                {/* <Form.Item label="授权数">
                    {getFieldDecorator('auth_num', {
                        rules: [{ required: true, message: '输入授权数量!' }],
                        initialValue: updateUserInfo.auth_num
                    })(
                        <Input
                            prefix={<Icon type="calculator" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="授权数量"
                        />,
                    )}
                </Form.Item> */}
                <Row>
                    <Col span={6} offset={6}>
                        <Button style={{ marginRight: 8 }} onClick={this.handleReset}>
                            重置
                    </Button>
                    </Col>
                    <Col span={6}>
                        <Button style={{ float: 'right' }} type="primary" htmlType="submit">
                            提交
                    </Button>
                    </Col>

                </Row>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

@connect(({ agent }) => ({
    agent
}))
class EditUserModal extends Component {
    handleCancle = () => {
        let { dispatch } = this.props;
        dispatch({
            type: 'agent/closeModal'
        })
    }

    handleOk = () => {

    }

    render() {
        let { agent: { showEditUserModal } } = this.props;
        return (
            <Modal
                title="添加用户"
                visible={showEditUserModal}
                onOk={this.handleOk}
                onCancel={this.handleCancle}
                footer={null}
                destroyOnClose={true}
            >
                <WrappedNormalLoginForm />
            </Modal>
        )
    }
}


export default EditUserModal