import { Icon, Row, Col } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
//import SelectLang from '../SelectLang';
import styles from './index.less';
import SelectUserCom from './SelectUserCom';
import store from 'store';

@connect(({ sh }) => ({
	sh
}))
class GlobalHeaderRight extends Component {

	render() {
		const { theme, layout } = this.props;
		let className = styles.right;

		if (theme === 'dark' && layout === 'topmenu') {
			className = `${styles.right}  ${styles.dark}`;
		}
		const isShow = location.href.indexOf('/enter')
		return (
			<div className={className} style={{ width: '1400px' }}>
				<Row>
					{
						isShow === -1 ?
							null
							:
							(
								<>
									<Col span={3}>
										<SelectUserCom />
									</Col>
									<Col span={2} style={{ textAlign: 'center' }} >
										{store.get('shUser') !== undefined ? store.get('shUser').online === 0 ? '不在线 ' : '在线' : '未选择用户'}
									</Col>
								</>
							)
					}

					<Avatar />

				</Row>



			</div>
		);

	}

};

export default connect(({ settings }) => ({
	theme: settings.navTheme,
	layout: settings.layout,
}))(GlobalHeaderRight);
