import React, { Component } from 'react';
import { Modal, Row, Col, Form, Icon, Input, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { addAgentNum } from '@/services/api';
import { connect } from 'dva';

@connect(({ allagent }) => ({
    allagent
}))
class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { dispatch, allagent } = this.props;
                values.uid = allagent.addAgentNumModal.uid
                let res = await addAgentNum(values);
                if (res.code === 1) {
                    this.props.form.resetFields();
                    this.props.onClose(2);
                    message.success(res.msg);
                    dispatch({
                        type: 'allagent/fetch'
                    })
                } else {
                    message.error(res.msg)
                }
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4, offset: 2 },
            wrapperCol: { span: 14, offset: 1 },
        };
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" {...formItemLayout}>
                <Form.Item label="增加数量">
                    {getFieldDecorator('num', {
                        rules: [{ required: true, message: '输入数量!' }],
                    })(
                        <Input
                            prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="输入数量"
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

@connect(({ allagent }) => ({
    allagent
}))
class AddNumModal extends Component {
    render() {
        let { visible, onClose, allagent: { addAgentNumModal } } = this.props;
        return (
            <Modal
                title="添加用户"
                visible={visible}
                onCancel={() => onClose(2)}
                footer={null}
            >
                <Row style={{ marginBottom: '20px' }}>
                    <Col offset={3}>当前总授权数{addAgentNumModal.allNum}， 可用授权数{addAgentNumModal.useNum}</Col>
                </Row>
                <WrappedNormalLoginForm
                    onClose={onClose}
                />
            </Modal>
        )
    }
}

AddNumModal.defaultProps = {
    visible: false
}

AddNumModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default AddNumModal