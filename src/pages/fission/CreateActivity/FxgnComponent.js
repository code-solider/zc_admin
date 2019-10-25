import React, { Component } from 'react';
import { Row, Col, Switch, Radio, Button, Input } from 'antd';
import { connect } from 'dva';

@connect(({ active_info }) => ({ active_info }))
class FxgnComponent extends Component {

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'fx_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[fx_on]': Number(formField['row[fx_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
            case 'fx_type':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[fx_type]': e.target.value
                        }
                    }
                })
                break;
            case 'fx_num':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[fx_num]': e.target.value
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
                <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>分销功能:</h3></Col>
                <Col span={11}>
                    <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('fx_on')} checked={Number(formField['row[fx_on]']) === 1} />
                    {
                        Number(formField['row[fx_on]']) === 1 ? (
                            <>
                                <div style={{ marginBottom: 10 }}>
                                    <Radio.Group value={formField['row[fx_type]']} onChange={(e) => this.handleChange('fx_type', e)}>
                                        <Radio style={{ marginRight: 20 }} value={0}>按分销比例</Radio>
                                        <Radio value={1}>按固定金额</Radio>
                                    </Radio.Group>
                                </div>
                                <Row style={{ marginTop: 10 }}>
                                    <Input
                                        value={formField['row[fx_num]']}
                                        onChange={(e) => this.handleChange('fx_num', e)}
                                        addonAfter={formField['row[fx_type]'] === 0 ? '%' : '元'}
                                    />
                                </Row>
                            </>
                        ) : null
                    }

                </Col>
            </Row>
        );
    }
}

export default FxgnComponent;