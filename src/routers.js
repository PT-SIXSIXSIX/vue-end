import Login from './views/Login'
import NotFound from './views/404'
import Register from './views/Register'
import Register2 from './views/Register-2'

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
      { path: '/2', name: 'Register-2', component: Register2 }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default routes;
