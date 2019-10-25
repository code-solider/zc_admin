import React, { Component } from 'react';
import { Row, Col, Switch, Radio, Button, Input } from 'antd';
import { connect } from 'dva';

@connect(({ active_info }) => ({ active_info }))
class ZaoshiComponent extends Component {

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'zaoshi_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[zaoshi_on]': Number(formField['row[zaoshi_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
            case 'zaoshi_num':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[zaoshi_num]': e.target.value
                        }
                    }
                })
                break;
        }
    }

    render() {
        const { active_info: { formField } } = this.props;
        return (
            <Row style={{ marginBottom: 40 }}>
                <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>造势:</h3></Col>
                <Col span={11}>
                    <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('zaoshi_on')} checked={Number(formField['row[zaoshi_on]']) === 1} />

                    {
                        Number(formField['row[zaoshi_on]']) === 1 ? (
                            <>
                                <Row>
                                    请填写初始虚拟“已入群群员”人数，将在前端页面展示<br />
                                    给粉丝一种活动火爆的感觉，真实已入群数=虚拟数+真实数
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Input value={Number(formField['row[zaoshi_num]'])} onChange={(e) => this.handleChange('zaoshi_num', e)} addonAfter='人' />
                                </Row>
                            </>
                        ) : null
                    }

                </Col>
            </Row>
        );
    }
}

export default ZaoshiComponent;