import axios from 'axios';

const apiUrl = 'http://192.168.1.200:8081/api/';

const apiVersion = 'v1';

const request = (url, options={}, method='get') => {
  let headers = {};
  if (!url.endsWith('login') && !url.endsWith('register') && !url.endsWith('forgetPassword')) {
    headers = {
        'X-YKAT-USER-ID': window.$cookies.get('userId'),
        'X-YIAT-ACCESS-TOKEN': window.$cookies.get('accessToken')
    }
  }

  let key = ~['get', 'head', 'options'].indexOf(method) ? 'params' : 'data';
  return axios(
      Object.assign({
        'url': `${apiUrl}${apiVersion}${url}`,
        'method':method,
        'headers': headers
      }, {[key]: options})
  ).then(res => res);
};

const axiosLogin = data => {
  return request('/login', data, 'post');
};

const axiosRegister = data => {
  return request('/register', data, 'post');
};


let requests = {
  Login: axiosLogin,
  Register: axiosRegister
};

export default requests;

