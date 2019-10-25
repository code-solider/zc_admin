import React, { Component } from 'react';
import { Card, Col, Row, Divider, Select, Input, Table, Statistic, Modal, Popconfirm, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import copy from 'copy-to-clipboard';

const { Option } = Select;
const { Search } = Input;

@connect(({ fissionActivityStatistics }) => ({
    fissionActivityStatistics
}))
class ActivityStatisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imgUrl: ''
        }
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    componentWillMount() {
        const { dispatch, fissionActivityStatistics } = this.props;
        dispatch({
            type: 'fissionActivityStatistics/fetch',
            payload: {
                page: fissionActivityStatistics.data_list_page,
                pageSize: fissionActivityStatistics.data_list_pageSize
            }
        })
    }

    handleWatch = (e) => {
        this.setState({
            visible: true,
            imgUrl: e
        })
    }

    closeModal = () => {
        this.setState({
            visible: false,
            imgUrl: ''
        })
    }

    fission_del = (e) => {
        const { dispatch, fissionActivityStatistics } = this.props;
        dispatch({
            type: 'fissionActivityStatistics/fission_del',
            payload: {
                ids: e.id
            },
            callback: () => {
                dispatch({
                    type: 'fissionActivityStatistics/fetch',
                    payload: {
                        page: fissionActivityStatistics.data_list_page,
                        pageSize: fissionActivityStatistics.data_list_pageSize
                    }
                })
            }
        })
    }

    handleUpdate = (e) => {
        const { dispatch } = this.props;
        for (let item in e) {
            if (item === 'id') {
                e.ids = e[item];
                delete e[item];
            } else {
                e[`row[${item}]`] = e[item];
                delete e[item];
            }
        }

        e['row[lable_data]'] = eval(e['row[lable_data]']);
        e['row[in_group_data]'] = eval(e['row[in_group_data]']);
        e['row[build_members]'] = eval(e['row[build_members]']);
        e['row[pay_price1]'] = eval(e['row[pay_price1]']);
        e['row[collect_data]'] = eval(e['row[collect_data]']);
        // e['row[active_content]'] = e['row[active_content]'];
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: eval(e),
                isUpdateState: true
            }
        })
        router.push('/fission/CreateActivity')
    }

    handleCopy = (e) => {
        copy(e);
        message.success('复制成功', 1)
    }

    render() {

        const columns = [
            {
                title: '活动名称',
                dataIndex: 'active_name',
                key: 'id',
            },
            {
                title: '活码类型',
                dataIndex: 'active_type',
                key: 'active_type',
            },
            {
                title: '自动建群数',
                dataIndex: 'auto_build_num',
                key: 'auto_build_num',
            },
            {
                title: '扫码数',
                dataIndex: 'code_num',
                key: 'code_num',
            },
            {
                title: '进群数',
                dataIndex: 'in_group_num',
                key: 'in_group_num',
            },
            {
                title: '付费金额',
                dataIndex: 'pay_total',
                key: 'pay_total',
            },
            {
                title: '分销奖励',
                dataIndex: 'fx_reward',
                key: 'fx_reward',
            },
            {
                title: '活码',
                dataIndex: 'active_img',
                key: 'active_img',
                render: (text) => (
                    <div onClick={() => this.handleWatch(text)}>查看</div>
                )
            },
            {
                title: '海报',
                dataIndex: 'bill_url',
                key: 'bill_url',
                render: (text) => (
                    <div onClick={() => this.handleWatch(text)}>查看</div>
                )
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.handleUpdate(record)}>修改</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定删除?"
                            onConfirm={() => this.fission_del(record)}
                            // onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </span >
                )
            },
        ];

        const { fissionActivityStatistics: { data_list, data_list_total, fission_counts } } = this.props;
        const paginationProps = {
            page: 1,
            onChange: (page) => this.handleTableChange(page),
            total: data_list_total,
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: () => `共${data_list_total}条`,
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
        }
        return (
            <>
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.closeModal}
                >
                    <Row>
                        <Col span={12} style={styles.modalCol}>
                            <div>图片</div>
                            <div style={styles.s2}><img src={this.state.imgUrl} /></div>
                            <div ><Button type='primary' href={''} download={this.state.imgUrl} icon="download">下载</Button></div>
                        </Col>
                        <Col span={12}>
                            <div>链接</div>
                            <div style={styles.s2}><Input disabled value={'12312313123123'} /></div>
                            <Button type='primary' icon="copy" onClick={() => this.handleCopy('1232313123131')}>复制链接</Button>
                        </Col>
                    </Row>

                </Modal>
                <Card title="活动统计">
                    <Row style={{ textAlign: 'center' }}>
                        <Col span={4}>
                            <Statistic title="活动总数" value={fission_counts.active_count ? fission_counts.active_count : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="自动建群数" value={fission_counts.auto_build_num ? fission_counts.auto_build_num : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="累计进群数" value={fission_counts.in_group_num ? fission_counts.in_group_num : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="累计扫码数" value={fission_counts.code_num ? fission_counts.code_num : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="付费总金额" value={fission_counts.pay_total ? fission_counts.pay_total : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic title="累计分销奖励" value={fission_counts.fx_reward ? fission_counts.fx_reward : 0} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={6}>
                            活动类型
                            <Select defaultValue="lucy" style={{ width: 220, marginLeft: 20 }} onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Search placeholder="请输入活动名称" onSearch={value => console.log(value)} enterButton />
                        </Col>
                    </Row>
                    <Divider />
                    <Table
                        rowKey="id"
                        bordered={true}
                        dataSource={data_list}
                        columns={columns}
                        pagination={paginationProps}
                    />
                </Card>
            </>
        );
    }
}

export default ActivityStatisticsPage;


/* style */

const styles = {
    modalCol: {
        display: 'flex',
        flexDirection: 'column'
    },
    s2: {
        margin: '10px 0px',
        height: '135px',
        display: 'flex',
        alignItems: 'center'
    }
}