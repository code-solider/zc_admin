/* 
    * create by 乔治的带头大哥
    * createTime: 2019年8月14日
    * 所有请求
*/
import { r_post, r_get, get_ali_config } from '@/utils/request';
import store from 'store';
import OSS from 'ali-oss';
import moment from 'moment';
import axios from 'axios';

// login
export async function login(payload) {
	return await r_post('/user/login', payload);
}

/* 总后台api start */

// 添加代理
export async function addAgent(payload) {
	return await r_post('/user/add_user', { token: store.get('token'), ...payload });
}

// 代理商列表
export async function getAgentList() {
	return await r_get('/manage/agent_list', { token: store.get('token') });
}

//增加代理授权数
export async function addAgentNum(payload) {
	return await r_post('/manage/add_num', { token: store.get('token'), ...payload });
}

/* 总后台api end */

/* 代理后台 start */

//店铺列表
export async function getShopList() {
	return await r_get('/manage/user_list', { token: store.get('token') });
}

//添加用户
export async function add_user(payload) {
	return await r_post('/user/add_user', { token: store.get('token'), ...payload });
}

//增加用户授权数
export async function add_num(payload) {
	return await r_post('/manage/add_num', { token: store.get('token'), ...payload });
}

//用户编辑(修改用户信息)
export async function user_edit(payload) {
	return await r_post('/manage/user_edit', { token: store.get('token'), ...payload });
}

//用户信息获取
export async function getUserInfo(params) {
	return await r_get('/manage/user_info', { token: store.get('token'), ...params });
}

//用户删除(修改用户信息)
export async function user_del(payload) {
	return await r_post('/manage/user_del', { token: store.get('token'), ...payload });
}

/* 代理后台 end */

/* 店铺后台 start */

//授权列表
export async function get_member_list(e) {
	return await r_get('/Shop/member_list', { token: store.get('token'), ...e });
}

//用户信息获取
export async function user_info(e) {
	return await r_get('/shop/user_info', { token: store.get('token'), ...e });
}

//添加授权
export async function add_member(payload) {
	return await r_post('/Shop/add_member', { token: store.get('token'), ...payload });
}

//授权获取
export async function get_member(params) {
	return await r_get('/Shop/get_member', { token: store.get('token'), ...params });
}

//授权编辑
export async function edit_member(payload) {
	return await r_post('/Shop/edit_member', { token: store.get('token'), ...payload });
}

//添加/编辑 进群得大奖
export async function prize_add(payload) {
	return await r_post('/Shop/prize_add', { token: store.get('token'), ...payload });
}

//微信群列表
export async function wx_group_list(params) {
	return await r_get('/Shop/wx_group_list', { token: store.get('token'), ...params });
}

//进群得大奖列表
export async function prize_list(params) {
	return await r_get('/Shop/prize_list', { token: store.get('token'), ...params });
}

//删除 进群得大奖
export async function prize_del(e) {
	return await r_post('/Shop/prize_del', { token: store.get('token'), ...e });
}

//关键词进群/付费进群 添加/编辑
export async function keyword_add(e) {
	return await r_post('/Shop/keyword_add', { token: store.get('token'), ...e });
}

//关键词进群/付费进群 列表
export async function keyword_list(e) {
	return await r_get('/Shop/keyword_list', { token: store.get('token'), ...e });
}

//删除 关键词进群/付费进群
export async function keyword_del(e) {
	return await r_post('/Shop/keyword_del', { token: store.get('token'), ...e });
}

//进群欢迎添加
export async function welcome_add(e) {
	return await r_post('/Shop/welcome_add', { token: store.get('token'), ...e });
}

//进群欢迎列表
export async function welcome_list(e) {
	return await r_get('/Shop/welcome_list', { token: store.get('token'), ...e });
}

//删除进群欢迎列表
export async function welcome_del(e) {
	return await r_post('/Shop/welcome_del', { token: store.get('token'), ...e });
}

//授权删除
export async function del_member(e) {
	return await r_post('/Shop/del_member', { token: store.get('token'), ...e });
}

//上传文件
export async function uploadFile(file) {//fileName表示上传的fileName , file表示上传的文件
	let res = (await axios.get('http://demo.bjletu.com/oss/sts.php')).data;
	const ossConfig = {
		accessKeyId: res.AccessKeyId,
		accessKeySecret: res.AccessKeySecret,
		stsToken: res.SecurityToken,
		bucket: "letu-lesson",
		region: "oss-cn-hangzhou"
	}
	let client = new OSS(ossConfig);
	let fileName = `${moment().format('YYYYMMDD')}/${file.name.split(".")[0]}-${file.uid}.${file.type.split("/")[1]}`;
	let result = await client.multipartUpload(fileName, file);

	/* 修改访问权限 start */
	await client.putACL(result.name, 'public-read');
	/* 修改访问权限 end */
	return result.res.requestUrls[0]

}

//微信好友列表
export async function wx_list_friends(e) {
	return await r_get('/Shop/wx_list', { token: store.get('token'), ...e });
}

//群宝裂变活动创建
export async function fission_add(e) {
	return await r_post('/Shop/fission_add', { token: store.get('token'), ...e });
}

//裂变活动列表
export async function fission_list(e) {
	return await r_get('/Shop/fission_list', { token: store.get('token'), ...e });
}

//裂变活动删除
export async function fission_del(e) {
	return await r_post('/Shop/fission_del', { token: store.get('token'), ...e });
}

//裂变活动计数
export async function fission_counts(e) {
	return await r_get('/Shop/fission_counts', { token: store.get('token'), ...e });
}

//活动用户信息列表
export async function fission_user(e) {
	return await r_get('/Shop/fission_user', { token: store.get('token'), ...e });
}

//活动用户信息列表
export async function get_auth_url(e) {
	let res = await axios.get('http://lessonapi.bjletu.com/api/wechat/get_auth_url', {
		params: {
			'uri': e,
		}
	});
	return res;
}

//处理授权成功后的存储
export async function auth_return(e) {
	return await r_get('/wechat/auth_return', { token: store.get('token'), ...e });
}

//处理授权成功后的存储
export async function get_info(e) {
	return await r_get('/wechat/get_info', { token: store.get('token'), ...e });
}


/* 店铺后台 end */