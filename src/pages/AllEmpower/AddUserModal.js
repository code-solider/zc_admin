import React, { Component } from 'react';
import { Modal, Button, Form, Icon, Input, message, Row, Col, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { addAgent } from '@/services/api'
import { connect } from 'dva';

@connect(({ allagent }) => ({
    allagent
}))
class NormalLoginForm extends Component {

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res = await addAgent(values);
                if (res.code === 0) {
                    message.error(res.msg);
                } else if (res.code === 1) {
                    let { dispatch } = this.props;
                    dispatch({
                        type: 'allagent/fetch'
                    })
                    let { onClose } = this.props;
                    onClose(1);
                    this.props.form.resetFields();
                    message.success(res.msg, 1);
                } else {
                    message.info(res.msg);
                }
            }
        });
    };

    checkData = (rule, value, callback) => {
        if (value) {
            if (/[\u4E00-\u9FA5]/g.test(value) || /^[0-9]+.?[0-9]*$/g.test(value)) {
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
        const config = {
            rules: [{ type: 'object', required: true, message: '选择到期时间!' }],
        };
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" {...formItemLayout}>
                <Form.Item label="用户名称">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '输入用户名称!' }, { validator: this.checkData }],
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
                    })(
                        <Input
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="手机号码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="登陆密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '输入登录密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="登录密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="到期时间">
                    {getFieldDecorator('end_time', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                    )}
                </Form.Item>
                <Form.Item label="授权数">
                    {getFieldDecorator('auth_num', {
                        rules: [{ required: true, message: '输入授权数量!' }],
                    })(
                        <Input
                            prefix={<Icon type="calculator" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="授权数量"
                        />,
                    )}
                </Form.Item>
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

class AddUserModal extends Component {

    render() {
        let { visible, onClose } = this.props;
        return (
            <Modal
                title="添加用户"
                visible={visible}
                onCancel={() => onClose(1)}
                footer={null}
            >
                <WrappedNormalLoginForm
                    onClose={onClose}
                />
            </Modal>
        )
    }
}

AddUserModal.defaultProps = {
    visible: false
}

AddUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default AddUserModal