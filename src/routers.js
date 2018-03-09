import Login from './views/Login'
import NotFound from './views/404'

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
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default routes;
