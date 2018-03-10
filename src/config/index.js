
let globalConfig = {
  cookieExpire: 7200,
  javaUrl: 'http://192.168.1.200:8081/api/v1',
  nodeJsUrl: 'http://localhost:8081/api/v1',
  allowedImageType: ['image/png', 'image/jpeg'],
  bgRouter: [
    '/login', '/forgetPassword', '/register', '/register/two'
  ],
};


export default globalConfig;
