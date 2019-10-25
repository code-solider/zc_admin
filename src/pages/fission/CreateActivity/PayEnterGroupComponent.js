import React, { Component } from 'react';
import { Row, Col, Switch, Radio, Button, Input } from 'antd';
import { connect } from 'dva';

@connect(({ active_info }) => ({ active_info }))
class PayEnterGroupComponent extends Component {

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'pay_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[pay_on]': Number(formField['row[pay_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
            case 'pay_type':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[pay_type]': e.target.value
                        }
                    }
                })
                break;
            case 'pay_price0':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[pay_price0]': e.target.value
                        }
                    }
                })
                break;
            case '数学课':
                let Exist = false, index = null;
                for (let i = 0; i < formField['pay_price1'].length; i++) {
                    if (formField['pay_price1'][i].hasOwnProperty("数学课")) {
                        Exist = true
                        index = i
                    }
                }
                if (Exist) {
                    let arr = formField['pay_price1'];
                    arr[i] = { "数学课": e.target.value }
                    dispatch({
                        type: 'active_info/update',
                        payload: {
                            formField: {
                                ...formField,
                                'row[pay_price1]': arr
                            }
                        }
                    })
                } else {
                    dispatch({
                        type: 'active_info/update',
                        payload: {
                            formField: {
                                ...formField,
                                'row[pay_price1]': formField['pay_price1'].push({ "数学课": e.target.value })
                            }
                        }
                    })
                }
                break;

        }
    }


    render() {
        const { active_info: { formField } } = this.props;
        return (
            <Row style={{ marginBottom: 40 }}>
                <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>是否付费进群:</h3></Col>
                <Col span={21}>
                    <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('pay_on')} checked={Number(formField['row[pay_on]']) === 1} />
                    {
                        Number(formField['row[pay_on]']) === 1 ? (
                            <>
                                <div style={{ marginBottom: 10 }}>
                                    <Radio.Group value={formField['row[pay_type]']} onChange={(e) => this.handleChange('pay_type', e)}>
                                        <Radio style={{ marginRight: 20 }} value={0}>固定价格</Radio>
                                        <Radio value={1}>按标签收费</Radio>
                                    </Radio.Group>
                                </div>
                                {
                                    formField['row[pay_type]'] === 0 ? (
                                        <Input
                                            type={'number'}
                                            style={{ width: 500 }}
                                            value={formField['row[pay_price0]']}
                                            onChange={(e) => { this.handleChange('pay_price0', e) }}
                                            placeholder='输入价格'
                                        />
                                    ) : (
                                            <>
                                                <Row style={{ marginBottom: 15 }} >
                                                    <Col span={2}><Button type='primary'>数学课</Button></Col>
                                                    <Col span={10}><Input type={'number'} onChange={(e) => this.handleChange('数学课', e)} /></Col>
                                                </Row>
                                                <Row style={{ marginBottom: 10 }} >
                                                    <Col span={2}><Button type='primary'>英语课</Button></Col>
                                                    <Col span={10}><Input type={'number'} onChange={(e) => this.handleChange('英语课', e)} /></Col>
                                                </Row>
                                                <Row style={{ marginBottom: 10 }} >
                                                    <Col span={2}><Button type='primary'>语文课</Button></Col>
                                                    <Col span={10}><Input type={'number'} onChange={(e) => this.handleChange('语文课', e)} /></Col>
                                                </Row>
                                                <Row style={{ marginBottom: 10 }} >
                                                    <Col span={2}><Button type='primary'>政治课</Button></Col>
                                                    <Col span={10}><Input type={'number'} onChange={(e) => this.handleChange('政治课', e)} /></Col>
                                                </Row>
                                            </>
                                        )
                                }

                            </>
                        ) : null
                    }

                </Col>
            </Row>
        );
    }
}

export default PayEnterGroupComponent;