import axios from 'axios';

const javaUrl = 'http://192.168.1.200:8081';
const nodejsUrl = 'http://localhost:8081';

const apiVersion = '/api/v1';

const request = (url, options={}, method='get', backEnd=true) => {
  let headers = {};
  if (!url.endsWith('login') && !url.endsWith('register') && !url.endsWith('forgetPassword')) {
    headers = {
        'X-YKAT-USER-ID': window.$cookies.get('userId'),
        'X-YIAT-ACCESS-TOKEN': window.$cookies.get('accessToken')
    }
  }

  let key = ~['get', 'head', 'options'].indexOf(method) ? 'params' : 'data';
  let apiUrl = backEnd ? javaUrl : nodejsUrl;
  return axios(
      Object.assign({
        'url': `${apiUrl}${apiVersion}${url}`,
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
}


let requests = {
  Login: axiosLogin,
  Register: axiosRegister,
  VerifyPhone: axiosVerifyPhone,
  GetSmsCode: axiosGetSmsCode,
  VerifySmsCode: axiosVerifySmsCode
};

export default requests;

