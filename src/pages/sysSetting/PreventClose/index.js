import React, { Component } from 'react';
import { Card, Row, Col, Input, Divider, Table, Button } from 'antd';

class PreventClosePage extends Component {
    render() {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '域名地址',
                dataIndex: 'name',
                key: 'name',
                width: '50%'
            },
            {
                title: '当前情况',
                dataIndex: 'address',
                key: 'address',
            },
        ];

        return (
            <Card title='域名防封'>
                <Row >
                    <Col span={1}>
                        <h4>访问域名</h4>
                    </Col>
                    <Col span={8}>
                        <Input value={'123'} />
                    </Col>
                </Row>
                <Divider />
                <Card title='落地域名' extra={<Button type="primary">添加落地页域名</Button>}>
                    <Table dataSource={dataSource} columns={columns} bordered />
                </Card>

            </Card>
        );
    }
}

export default PreventClosePage;