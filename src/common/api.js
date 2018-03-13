import axios from 'axios';
import globalConfig from '../config'

const request = (url, options={}, method='get', _this=this, backEnd=true, autoCatch=true) => {
  let headers = {};
  if (!url.endsWith('login') && !url.endsWith('register') && !url.endsWith('forgetPassword')) {
    headers = {
        'X-YKAT-USER-ID': window.$cookies.get('userId'),
        'X-YIAT-ACCESS-TOKEN': window.$cookies.get('accessToken')
    }
  }

  let key = ~['get', 'head', 'options'].indexOf(method) ? 'params' : 'data';
  let apiUrl = backEnd ? globalConfig.javaUrl : globalConfig.nodeJsUrl;
  let promise = axios(
      Object.assign({
        'url': `${apiUrl}${url}`,
        'method':method,
        'headers': headers
      }, {[key]: options})
  );

  return autoCatch ? promise.catch(error => {
    console.log(error);
    if (!error.response || !error.response.hasOwnProperty('data')) {
      _this.$message.error('发生未知错误');
    } else {
      _this.$message.error(error.response.data.errorDesc);
    }
  }) : promise;
};

// java
const axiosLogin = (data, _this) => {
  return request('/login', data, 'post', _this);
};

const axiosRegister = (data, _this) => {
  return request('/register', data, 'post', _this);
};

const axiosVerifyPhone = (params, _this) => {
  return request('/register', params, 'get', _this);
};


const axiosforgetPassword = (data, _this) => {
  return request('/password', data, 'post', _this);
};

//node.js
const axiosGetSmsCode = (params, _this) => {
  return request('/sms', params, 'get', _this, false);
};

const axiosVerifySmsCode = (params, _this) => {
  return request('/sms/verify', params, 'get', _this, false, false);
};

const axiosGetStoreInfo = (userId, params, _this) => {
  return request('/users/' + userId + '/store', params, 'get', _this);
};

const axiosPutStoreInfo = (userId, data, _this) => {
  return request('/users/' + userId + '/store', data, 'put', _this);
};

const axiosGetOrders = (userId, type, params) => {
  return request('/users/' + userId + '/orders/' + type, params, 'get', _this);
};

const axiosUpdateOrderState = (userId, type, orderId, data) => {
  return request('/users/' + userId + '/store/' + orderId, data, 'put', _this);
};

const axiosGetSettleList = (userId, params) => {
  return request('/users/' + userId + '/settle_account_records', params, 'get', _this);
};

let requests = {
  Login: axiosLogin,
  Register: axiosRegister,
  VerifyPhone: axiosVerifyPhone,
  GetSmsCode: axiosGetSmsCode,
  VerifySmsCode: axiosVerifySmsCode,
  forgetPassword: axiosforgetPassword,
  GetStoreInfo: axiosGetStoreInfo,
  PutStoreInfo: axiosPutStoreInfo,
  GetOrders: axiosGetOrders,
  UpdateOrderState: axiosUpdateOrderState,
  GetSettleList: axiosGetSettleList,
};

export default requests;

