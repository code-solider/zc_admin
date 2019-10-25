import React, { Component } from 'react';
import { Card, Table, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ sysSettingEmpowerGZPT }) => ({
    sysSettingEmpowerGZPT
}))
class EmpowerGZPT extends Component {

    handleJump = () => {
        // router.push('/sysSetting/EmpowerGZPT/addWarrant')
        const { dispatch } = this.props;
        dispatch({
            type: 'sysSettingEmpowerGZPT/fetch',
            payload: {
                uri: 'http://demo.bjletu.com/soadmin/index.html#/./sysSetting/EmpowerGZPT'
            },
            callback: (e) => {
                // router.push(e)
                window.location.href = e
            }
        })
    }

    componentWillMount() {
        let auth_code = this.props.location.query.auth_code;
        const { dispatch } = this.props;
        if (auth_code) {
            dispatch({
                type: 'sysSettingEmpowerGZPT/saveCode',
                payload: {
                    auth_code
                }
            })
        } else {
            dispatch({
                type: 'sysSettingEmpowerGZPT/getData',
            })
        }
    }

    handleDel = (e) => {
        console.log(e, 123);
    }

    render() {
        const columns = [
            {
                title: 'LOGO',
                dataIndex: 'head_img',
                key: 'head_img',
                render: (item, record, index) => {
                    return <img src={record.head_img} alt='logo' width='100' />
                }
            },
            {
                title: '名称',
                dataIndex: 'nick_name',
                key: 'nick_name',
            },
            {
                title: '公众号类型',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '认证类型',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '绑定时间',
                dataIndex: 'createtime',
                key: 'createtime',
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render: (item, record, index) => {
                    return <Button type='primary' icon='close' onClick={() => this.handleDel(record)}>删除</Button>
                }
            },
        ];

        const { sysSettingEmpowerGZPT: { data, data_list_total } } = this.props;
        return (
            <Card title='公众平台授权' extra={<Button type="primary" onClick={this.handleJump}>授权公众号</Button>}>
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                />
            </Card>
        );
    }
}

export default EmpowerGZPT;