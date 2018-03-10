import Login from './views/Login'
import NotFound from './views/404'
import Register from './views/Register'
import RegisterTwo from './views/RegisterTwo'

let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    component: NotFound,
    name: 'NotFound'
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    children: [
      {
        path: 'two',
        name: 'RegisterTwo',
        component: RegisterTwo
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default routes;
