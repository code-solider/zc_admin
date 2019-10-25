import React, { Component } from 'react';
import { Card, Row, Col, Button, Input, Upload, Icon } from 'antd';
import { connect } from 'dva';

@connect(({ sysSettingEmpowerWechatPay }) => ({
    sysSettingEmpowerWechatPay
}))
class EmpowerWechatPay extends Component {
    render() {

        return (
            <Card title='微信支付授权'>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}><h4>支付账号</h4></Col>
                    <Col span={12} >12312312</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}><h4>身份标识(appid)</h4></Col>
                    <Col span={7} ><Input disabled value="wx48645496498465465456" /></Col>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}></Col>
                    <Col span={7} >公众号身份标识,请通过修改公众号信息来保存</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}><h4>微信支付商户号(mchid)</h4></Col>
                    <Col span={7} ><Input value="" /></Col>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}></Col>
                    <Col span={7} >公众号支付请求中用于加密的秘钥key</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}><h4>微信支付秘钥(API秘钥)</h4></Col>
                    <Col span={7} ><Input value="" /></Col>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}></Col>
                    <Col span={7} >此值需要手动在腾讯商户后台API秘钥保持一致</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}><h4>CERT证书文件</h4></Col>
                    <Col span={7} >
                        <Upload >
                            <Button>
                                <Icon type="upload" /> 点击上传
                             </Button>
                        </Upload>
                    </Col>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}></Col>
                    <Col span={7} >下载证书cert.zip的apiclient_cert.pem文件</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}><h4>KEY秘钥文件</h4></Col>
                    <Col span={7} >
                        <Upload >
                            <Button>
                                <Icon type="upload" /> 点击上传
                             </Button>
                        </Upload>
                    </Col>
                    <Col span={11} style={{ textAlign: 'right', marginRight: 20 }}></Col>
                    <Col span={7} >下载证书cert.zip的apiclient_cert.pem文件</Col>
                </Row>
                <Row style={{ textAlign: 'center' }}>
                    <Button type="primary">提交</Button>
                </Row>
            </Card>
        );
    }
}

export default EmpowerWechatPay;