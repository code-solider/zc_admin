import React, { Component } from 'react';
import { Row, Col, Input, Modal } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

@connect(({ sh, loading }) => ({
    sh, loading: loading.models.sh
}))
class UserModal extends Component {

    handleChange = (e, e2) => {
        let { dispatch, sh: { currentData } } = this.props;
        let newObj;
        if (e === 1) {
            newObj = { ...currentData, name: e2 }
        } else if (e === 2) {
            newObj = { ...currentData, remark: e2 }
        }

        dispatch({
            type: 'sh/update',
            payload: {
                currentData: newObj
            }
        })
    }

    handleOk = () => {
        let { dispatch, sh: { currentData, data_list_page, data_list_pageSize } } = this.props;
        dispatch({
            type: 'sh/add_edit__memberE',
            payload: {
                name: currentData.name,
                remark: currentData.remark,
                ids: currentData.id
            },
            callback: () => {
                this.handleCancel();
                dispatch({
                    type: 'sh/fetch',
                    payload: {
                        page: data_list_page,
                        pageSize: data_list_pageSize
                    }
                })
                dispatch({
                    type: 'sh/getUserInfo',
                })
                dispatch({
                    type: 'sh/update',
                    payload: {
                        currentData: {}
                    }
                })
            }
        })

    }

    handleCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'sh/update',
            payload: {
                showModal: false,
                currentData: {}
            }
        })
    }

    render() {
        let { sh: { currentData, showModal }, loading } = this.props;
        return (
            <Modal
                title="添加授权"
                visible={showModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                confirmLoading={loading}
            >

                <Row>
                    <Col span={5}>员工姓名</Col>
                    <Col span={10}>
                        <Input onChange={(e) => this.handleChange(1, e.target.value)} value={currentData.name} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col span={5}>备注</Col>
                    <Col span={10}>
                        <Input onChange={(e) => this.handleChange(2, e.target.value)} value={currentData.remark} />
                    </Col>
                </Row>
            </Modal >
        )
    }
}

export default UserModal
