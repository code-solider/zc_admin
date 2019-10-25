import React, { Component } from 'react';
import { Card, Table, Divider, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

@connect(({ allagent }) => ({
    allagent
}))
class List extends Component {

    handleClick = (e) => {
        let { onShow, dispatch } = this.props;
        onShow(2);
        dispatch({
            type: 'allagent/updateAddAgentNumModal',
            payload: {
                allNum: e.auth_num,
                useNum: e.use_num,
                uid: e.id
            }
        })
    }

    handleUpdateClick = (e) => {
        let { dispatch } = this.props;
        dispatch({
            type: 'allagent/showEditUserModal',
            payload: e
        })
    }

    handleDel = (e) => {
        const { dispatch, allagent } = this.props;
        dispatch({
            type: 'allagent/user_del',
            payload: {
                ids: e.id
            },
            callback: () => {
                dispatch({
                    type: 'allagent/fetch'
                })
            }
        })
    }

    render() {

        const columns = [
            {
                title: '服务商名称',
                dataIndex: 'nickname',
                key: 'nickname',
            },
            {
                title: '手机号码(登陆账号)',
                dataIndex: 'mobile',
                key: 'mobile',
            },
            {
                title: '到期日期',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: '总授权数',
                dataIndex: 'auth_num',
                key: 'auth_num',
            },
            {
                title: '已授权数',
                dataIndex: 'use_num',
                key: 'use_num',
            },
            {
                title: '剩余可用授权数',
                dataIndex: 'restNum',
                key: 'restNum',
            },
            {
                title: '操作',
                key: 'id',
                width: '200px',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => this.handleClick(text)}>增加授权数</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.handleUpdateClick(text)}>修改</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="删除不可恢复?"
                            onConfirm={() => this.handleDel(text)}
                            okText="是"
                            cancelText="否"
                        >
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];
        let { onShow, data } = this.props;
        return (
            <Card
                style={{ marginTop: '20px' }}
                // title="当前已开通1个商户"
                extra={<Button type="primary" onClick={() => onShow(1)}>添加服务商</Button>}
            >
                <Table
                    bordered
                    dataSource={data} columns={columns}
                />
            </Card>
        )
    }
}

List.propTypes = {
    onShow: PropTypes.func.isRequired
}

export default List
