import axios from 'axios';
import globalConfig from '../config'

// 超时阈值3秒
axios.defaults.timeout = 3000;

const request = (url, options={}, method='get', _this, backEnd=true, autoCatch=true) => {
  let headers = {};
  if (!url.endsWith('login') && !url.endsWith('register') && !url.endsWith('forgetPassword')) {
    headers = {
        'X-YKAT-USER-ID': window.$cookies.get('userId'),
        'X-YKAT-ACCESS-TOKEN': window.$cookies.get('accessToken')
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

  let cPromise = autoCatch ? promise.catch(error => {
    if (!error.response) {
      _this.$notify.error({
        title: '错误',
        message: '请求失败，请检查网络'
      })
    } else if (!error.response.data.hasOwnProperty('errorDesc')) {
      _this.$notify.error({
        title: '错误',
        message: error.response.statusText
      })
    } else {
      _this.$notify.error({
        title: '错误',
        message: error.response.data.errorDesc
      });
    }
  }) : promise;

  return cPromise.then(res => {
    return new Promise(resolve => {
      if (res !== undefined)
        resolve(res);
    })
  });
};

// java
const axiosLogin = (data, _this) => {
  return request('/login/', data, 'post', _this);
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

const axiosVerifySmsCode = (params) => {
  return request('/sms/verify', params, 'get', null, false, false);
};

const axiosGetStoreInfo = (userId, params, _this) => {
  return request('/users/' + userId + '/store', params, 'get', _this);
};

const axiosPutStoreInfo = (userId, data, _this) => {
  return request('/users/' + userId + '/store', data, 'put', _this);
};

const axiosGetOrders = (userId, type, params, _this) => {
  return request('/users/' + userId + '/orders/' + type, params, 'get', _this);
};

const axiosUpdateOrderState = (userId, type, orderId, data, _this) => {
  return request('/users/' + userId + '/orders/' + type + '/' + orderId, data, 'put', _this);
};

const axiosGetSettleList = (userId, params, _this) => {
  return request('/users/' + userId + '/settleAccountRecords', params, 'get', _this);
};

const axiosBatchSettle = (userId, state, data, _this) => {
  return request('/users/' + userId + '/sa?state=' + state, data, 'put', _this);
};

const axiosGetStaffList = (userId, params, _this) => {
  return request('/users/' + userId + '/staffs', params, 'get', _this);
};

const axiosGetBankCards = (userId, params, _this) => {
  return request('/users/' + userId + '/bankcards', params, 'get', _this);
};

const axiosAddBankCard = (userId, data, _this) => {
  return request('/users/' + userId + '/bankcards', data, 'post', _this);
};

const axiosDeleteBankCard = (userId, data, _this) => {
  return request('/users/' + userId + '/bankcards', data, 'delete', _this)
};

const axiosDeleteStaff = (userId, staffId, params, _this) => {
  return request('/users/' + userId + '/staffs/' + staffId, params, 'delete', _this);
};

const axiosAddStaff = (userId, data, _this) => {
  return request('/users/' + userId + '/staffs', data, 'post', _this);
};

const axiosGetDeposits = (userId, params, _this) => {
  return request('/users/' + userId + '/deposits', params, 'get', _this);
};

const axiosRechargeDeposit = (userId, data, _this) => {
  return request('/users/' + userId + '/deposits', data, 'post', _this);
};

const axiosGetMoneyRecords = (userId, params, _this) => {
  return request('/users/' + userId + '/receive_money_records', params, 'get', _this);
};

const axiosGetDrivers = (params, _this) => {
  return request('/drivers', params, 'get', _this);
};

const axiosAddOrder = (userId, type, data, _this) => {
  return request('/users/' + userId + '/orders/' + type, data, 'post', _this);
};

const axiosGetArticleList = (userId, params, _this) => {
  return request('/users/' + userId + '/articles', params, 'get', _this);
};

const axiosAddArticle = (userId, data, _this) => {
  return request('/users/' + userId + '/articles', data, 'post', _this);
};

const axiosGetArticle = (userId, articleId, params, _this) => {
  return request('/users/' + userId + '/articles/' + articleId, params, 'get', _this);
};

const axiosUpdateArticle = (userId, articleId, data, _this) => {
  return request('/users/' + userId + '/articles/' + articleId, data, 'put', _this);
};

const axiosBatchDeleteArticle = (userId, data, _this) => {
  return request('/users/' + userId + '/articles', data, 'delete', _this);
};

const axiosGetProjects = (userId, params, _this) => {
  return request('/projects/' + userId + '/getProjects', params, 'get', _this);
};

const axiosAddProject = (userId, data, _this) => {
  return request('/projects/' + userId + '/addProject', data, 'post', _this);
};

const axiosDeleteProject = (userId, data, _this) => {
  return request('/projects/' + userId + '/deleteProjects', data, 'delete', _this);
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
  BatchSettle: axiosBatchSettle,
  GetStaffList: axiosGetStaffList,
  GetBankCards: axiosGetBankCards,
  AddBankCard: axiosAddBankCard,
  DeleteBankCard: axiosDeleteBankCard,
  DeleteStaff: axiosDeleteStaff,
  AddStaff: axiosAddStaff,
  GetDeposits: axiosGetDeposits,
  RechargeDeposit: axiosRechargeDeposit,
  GetMoneyRecords: axiosGetMoneyRecords,
  GetDrivers: axiosGetDrivers,
  AddOrder: axiosAddOrder,
  GetArticles: axiosGetArticleList,
  AddArticle: axiosAddArticle,
  UpdateArticle: axiosUpdateArticle,
  GetArticle: axiosGetArticle,
  BatchDeleteArticle: axiosBatchDeleteArticle,
  GetProjects: axiosGetProjects,
  AddProject: axiosAddProject,
  DeleteProject: axiosDeleteProject,
};

export default requests;

