import React, { Component } from 'react';
import { Card, Col, Row, Divider, Select, Input, Table } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
const { Search } = Input;

@connect(({ fissionCustomerInfo }) => ({
    fissionCustomerInfo
}))
class CustomerInfoPage extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'fissionCustomerInfo/fetch'
        })
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
        const columns = [
            {
                title: '客户信息',
                dataIndex: 'nickname',
                key: 'nickname',
            },
            {
                title: '活动名称',
                dataIndex: 'active_name',
                key: 'active_name',
            },
            {
                title: '扫码时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '支付金额',
                dataIndex: 'pay',
                key: 'pay',
            },
            {
                title: '分销奖励',
                dataIndex: 'reward',
                key: 'reward',
            },
            {
                title: '收集信息',
                dataIndex: 'data',
                key: 'data',
            },
        ];

        const { fissionCustomerInfo: { data_list, data_list_total } } = this.props;
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
                <Card title="客户信息">
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
                        dataSource={data_list}
                        bordered
                        columns={columns}
                        pagination={paginationProps}
                    />
                </Card>
            </>
        );
    }
}

export default CustomerInfoPage;