import React, { Component } from 'react';
import { Row, Col, Switch, Radio, Button, Input, Modal, Form, Icon } from 'antd';
import { connect } from 'dva';

@connect(({ active_info }) => ({ active_info }))
class CollectInfoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            info: ''
        }
    }

    handleModal = (e) => {//参数布尔值 true 显示  false 隐藏
        this.setState({ showModal: e, info: '' })
    }

    subModal = (e) => {
        this.handleChange('addInfo', e)
        this.handleModal(false);
    }

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'collect_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[collect_on]': Number(formField['row[collect_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
            case 'info':
                this.setState({ info: e.target.value })
                break;
            case 'addInfo':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[collect_data]': [...formField['row[collect_data]'], e]
                        }
                    }
                })
                break;
        }
    }

    render() {
        const { active_info: { formField } } = this.props;
        const { showModal } = this.state;
        return (
            <>
                <Row style={{ marginBottom: 40 }}>
                    <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>收集入群信息:</h3></Col>
                    <Col span={11}>
                        <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('collect_on')} checked={Number(formField['row[collect_on]']) == 1} />

                        {
                            Number(formField['row[collect_on]']) == 1 ? (
                                <>
                                    <Row>
                                        设置后，群成员入群前必须填写信息，  <br />
                                        入群填写信息内容一旦保存将不能 删除、修改， 请谨慎操作！
                                    </Row>
                                    {
                                        formField['row[collect_data]'].map((item, key) => {
                                            return (
                                                < Input
                                                    value={`${item.username},${item.tel},${item.wechat},${item.industry},${item.job}`}
                                                    key={key}
                                                    disabled
                                                    style={{ marginTop: 10 }}
                                                />
                                            )
                                        })
                                    }
                                    <Row style={{ marginTop: 10 }}><Input disabled value='如：名字、电话、微信、行业、职位等' /></Row>
                                </>
                            ) : null
                        }

                    </Col>
                    {
                        Number(formField['row[collect_on]']) == 1 ? (
                            <Col span={2}><Button type='primary' onClick={() => this.handleModal(true)}>继续添加</Button></Col>
                        ) : null
                    }

                </Row>
                <CollectionCreateForm
                    visible={showModal}
                    onCancel={() => this.handleModal(false)}
                    onCreate={this.subModal}
                />
            </>
        );
    }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        handleSub = (e) => {
            const { onCreate } = this.props;
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    onCreate(values);
                } else {
                    return false;
                }
            });
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = this.props.form;
            return (
                <Modal
                    visible={visible}
                    title="添加人员信息"
                    okText="添加"
                    onCancel={onCancel}
                    onOk={this.handleSub}
                >
                    <Form layout="horizontal" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                        <Form.Item label="姓名">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '填写姓名!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="电话">
                            {getFieldDecorator('tel', {
                                rules: [{ required: true, message: '输入电话!' }]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="微信">
                            {getFieldDecorator('wechat', {
                                rules: [{ required: true, message: '填写微信!' }]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="行业">
                            {getFieldDecorator('industry', {
                                rules: [{ required: true, message: '填写行业!' }]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="工作">
                            {getFieldDecorator('job', {
                                rules: [{ required: true, message: '填写工作!' }]
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default CollectInfoComponent;