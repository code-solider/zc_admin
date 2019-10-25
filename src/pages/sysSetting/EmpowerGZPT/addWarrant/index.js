import React, { Component } from 'react';
import { Card, Table, Button } from 'antd';
import { connect } from 'dva';

@connect(({ sysSettingEmpowerGZPT }) => ({
    sysSettingEmpowerGZPT
}))
class Page extends Component {
    render() {
        return (
            <div>1211113</div>
        );
    }
}

export default Page;