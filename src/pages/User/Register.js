import React, { Component } from 'react';
import {Form, Input, Row, Col,  Button } from 'antd';


const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];


class RegistrationForm extends Component{
  
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };
  
  render(){
    const { getFieldDecorator } = this.props.form;
    
    return(
      <div style={{width:'80%',margin:'0 auto'}}>
        <Form  onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: '邮箱未输入!',
                },
              ],
            })(<Input placeholder="企业名称" />)}
          </Form.Item>
    
          <Form.Item>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(<Input placeholder="地址"/>)}
          </Form.Item>
    
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input placeholder="手机号码"  style={{ width: '100%' }} />)}
          </Form.Item>
  
          <Row>
            <Col span={15}>
              <Form.Item>
                {getFieldDecorator('phone1', {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(<Input placeholder="短信验证码"  style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={8} offset={1}>
              <Button type={'primary'}>获取验证码</Button>
            </Col>
          </Row>
    
          <Form.Item  hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password placeholder="密码"/>)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="确认密码"/>)}
          </Form.Item>
    
          <Form.Item >
            {getFieldDecorator('website', {
              rules: [{ required: true, message: 'Please input website!' }],
            })(
        
              <Input placeholder="邀请码" />
      
            )}
          </Form.Item>
    
          <Form.Item  >
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm
