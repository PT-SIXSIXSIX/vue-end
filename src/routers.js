import Login from './views/Login'
import NotFound from './views/404'
import Register from './views/Register'
import RegisterTwo from './views/RegisterTwo'
import ForgetPassword from './views/ForgetPassword'
import ForgetPasswordTwo from './views/ForgetPassswordTwo'

import index from './views/index'
import Store from './views/Store'
// order
import Order from './views/order/Order'
import MaintainOrder from './views/order/MaintainOrder'
import MaintainTask from './views/order/MaintainTask'
import RecoveryTask from './views/order/RecoveryTask'
import TrailTask from './views/order/TrailTask'
// account
import BankCardList from './views/account/BankCardlist'
import AddBankCard from './views/account/AddBankCard'
import DepositList from './views/account/DepositList'
import MoneyRecord from './views/account/MoneyRecord'
// staff
import StaffList from  './views/staff/StaffList'
import AddStaff from './views/staff/AddStaff'
// settle
import SettleList from './views/SettleList'

let routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect: '/index/store',
    children: [
      { path: 'store', name: 'Store', component: Store },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        children: [
          { path: 'maintainOrder', name: 'MaintainOrder', component: MaintainOrder },
          { path: 'maintainTask', name: 'MaintainTask', component: MaintainTask },
          { path: 'recoveryTask', name: 'RecoveryTask', component: RecoveryTask },
          { path: 'trailTask', name: 'TrailTask', component: TrailTask }
        ]
      },
      { path: 'account/bankCardList', name: 'BankCardList', component: BankCardList },
      { path: 'account/addBankCard', name: 'AddBankCard', component: AddBankCard },
      { path: 'account/depositList', name: 'DepositList', component: DepositList },
      { path: 'account/moneyRecord', name: 'MoneyRecord', component: MoneyRecord },
      { path: 'staffList', name: 'StaffList', component: StaffList },
      { path: 'addStaff', name: 'AddStaff', component: AddStaff },
      { path: 'settleList', name: 'SettleList', component: SettleList },
    ]
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
      { path: 'two', name: 'RegisterTwo', component: RegisterTwo }
    ]
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword,
    children: [
      { path: 'two', name: 'ForgetPasswordTwo', component: ForgetPasswordTwo }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default routes;

