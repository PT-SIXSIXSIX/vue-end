import Login from './views/Login'
import HelloWorld from './components/HelloWorld'

let routes = [
  {
    path: '/home',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

export default routes;
