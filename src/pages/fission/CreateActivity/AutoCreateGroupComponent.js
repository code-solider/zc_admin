import React, { Component } from 'react';
import { Row, Col, Input, Button, Switch, Select } from 'antd';
import { connect } from 'dva';
import store from 'store';
const { TextArea } = Input;
const { Option } = Select;

@connect(({ active_info }) => ({ active_info }))
class AutoCreateGroupComponent extends Component {

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'build_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[build_on]': Number(formField['row[build_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
            case 'build_name':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[build_name]': e.target.value
                        }
                    }
                })
                break;
            case 'build_num':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[build_num]': e.target.value
                        }
                    }
                })
                break;
        }
    }

    handleGetWxFriends = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'active_info/handleGetWxFriends',
            payload: {
                wxid:/*  store.get('shUser').wx_id */'wxid_ykccgkoai1ta21'
            }
        })
    }

    handleSelectChange = (e) => {
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[build_members]': e
                }
            }
        })
    }

    render() {
        const { active_info: { formField, wx_friends_list } } = this.props;
        return (
            <Row style={{ marginBottom: 40 }}>
                <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>是否自动建群:</h3></Col>
                <Col span={21}>
                    <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('build_on')} checked={Number(formField['row[build_on]']) === 1} />
                    {
                        Number(formField['row[build_on]']) === 1 ? (
                            <>
                                <Row style={{ marginBottom: 10 }}>
                                    <Col span={2} style={{ textAlign: 'right' }}>
                                        群名称：
                                    </Col>
                                    <Col span={10}>
                                        <Input onChange={(e) => this.handleChange('build_name', e)} value={formField['row[build_name]']} />
                                        <Row>请输入创建群时设置的群名称</Row>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 10 }}>
                                    <Col span={2} style={{ textAlign: 'right' }}>
                                        创群起始编号：
                                    </Col>
                                    <Col span={10}>
                                        <Input onChange={(e) => this.handleChange('build_num', e)} value={formField['row[build_num]']} />
                                        <Row>
                                            系统会自动在已社群名称后面加上数字编号，方便多群区分。<br />
                                            如起始编号为3,那么第一个群为XXXX 3，第二个群XXX 4，依次类推
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={2} style={{ textAlign: 'right' }}>
                                        自动拉初始成员：
                                    </Col>
                                    <Col span={10}>
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="点击添加"
                                            value={formField['row[build_members]']}
                                            onChange={this.handleSelectChange}
                                            showArrow={true}
                                            onDropdownVisibleChange={this.handleGetWxFriends}
                                        >
                                            {
                                                wx_friends_list && wx_friends_list.map((item, key) => {
                                                    return <Option key={key}>{item.userName}</Option>
                                                })
                                            }

                                        </Select>
                                    </Col>
                                </Row>
                            </>
                        ) : null
                    }

                </Col>
            </Row>
        );
    }
}

export default AutoCreateGroupComponent;