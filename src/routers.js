import Login from './views/Login'
import NotFound from './views/404'
import StoreAdmin from './views/StoreAdmin'
import Register from './views/Register'
import RegisterTwo from './views/RegisterTwo'

let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/storeAdmin',
    name: 'StoreAdmin',
    component: StoreAdmin
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
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

