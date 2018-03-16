
let globalConfig = {
  cookieExpire: 36000,
  javaUrl: 'http://192.168.2.3:8080/api/v1',
  nodeJsUrl: 'http://47.74.176.87:8081/api/v1',
  allowedImageType: ['image/png', 'image/jpeg'],
  bgRouter: [
    '/login', '/register', '/register/two',
    '/forgetPassword', '/forgetPassword/two',
  ],
  itemPerPage: 7,
  depositThreshold: 2000,
};

export default globalConfig;
