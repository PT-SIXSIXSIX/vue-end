
let globalConfig = {
  cookieExpire: 7200,
  javaUrl: 'http://192.168.2.3:8080/api/v1',
  nodeJsUrl: 'http://localhost:8081/api/v1',
  allowedImageType: ['image/png', 'image/jpeg'],
  bgRouter: [
    '/login', '/register', '/register/two',
    '/forgetPassword', '/forgetPassword/two',
  ],
};

export default globalConfig;
