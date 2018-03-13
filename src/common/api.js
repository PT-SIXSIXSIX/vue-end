import axios from 'axios';
import globalConfig from '../config'

const request = (url, options={}, method='get', backEnd=true) => {
  let headers = {};
  if (!url.endsWith('login') && !url.endsWith('register') && !url.endsWith('forgetPassword')) {
    headers = {
        'X-YKAT-USER-ID': window.$cookies.get('userId'),
        'X-YIAT-ACCESS-TOKEN': window.$cookies.get('accessToken')
    }
  }

  let key = ~['get', 'head', 'options'].indexOf(method) ? 'params' : 'data';
  let apiUrl = backEnd ? globalConfig.javaUrl : globalConfig.nodeJsUrl;
  return axios(
      Object.assign({
        'url': `${apiUrl}${url}`,
        'method':method,
        'headers': headers
      }, {[key]: options})
  );
};

// java
const axiosLogin = data => {
  return request('/login', data, 'post');
};

const axiosRegister = data => {
  return request('/register', data, 'post');
};

const axiosVerifyPhone = () => {
  return request('/register?verifyPhone=1', {}, 'get');
};

//node.js
const axiosGetSmsCode = params => {
  return request('/sms', params, 'get', false);
};

const axiosVerifySmsCode = params => {
  return request('/sms/verify', params, 'get', false);
};

const axiosGetStoreInfo = (userId, params) => {
  return request('/users/' + userId + '/store', params, 'get');
};

const axiosPutStoreInfo = (userId, data) => {
  return request('/users/' + userId + '/store', data, 'put');
};

const axiosGetOrders = (userId, type, params) => {
  return request('/users/' + userId + '/orders/' + type, params, 'get');
};

const axiosUpdateOrderState = (userId, type, orderId, data) => {
  return request('/users/' + userId + '/store/' + orderId, data, 'put');
};

const axiosGetSettleList = (userId, params) => {
  return request('/users/' + userID + '/settle_account_records');
};

let requests = {
  Login: axiosLogin,
  Register: axiosRegister,
  VerifyPhone: axiosVerifyPhone,
  GetSmsCode: axiosGetSmsCode,
  VerifySmsCode: axiosVerifySmsCode,
  GetStoreInfo: axiosGetStoreInfo,
  PutStoreInfo: axiosPutStoreInfo,
  GetOrders: axiosGetOrders,
  UpdateOrderState: axiosUpdateOrderState,
  GetSettleList: axiosGetSettleList,
};

export default requests;

