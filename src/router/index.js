import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/Auth/SignIn'
import Users from '../views/employees/List'
import AddUser from '../views/employees/Add'
import EditUser from '../views/employees/Edit'

import Branchs from '../views/branchs/List'
import addBranchs from '../views/branchs/Add'
import editBranchs from '../views/branchs/Edit'

import Notifications from '../views/notifications/List'
import addNotifications from '../views/notifications/Add'
import editNotifications from '../views/notifications/Show'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/edit/:id',
    name: 'EditUser',
    component: EditUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/branchs',
    name: 'Branchs',
    component: Branchs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/branchs/add',
    name: 'addBranchs',
    component: addBranchs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/branchs/edit/:id',
    name: 'editBranchs',
    component: editBranchs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notifications/add',
    name: 'addNotifications',
    component: addNotifications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notifications/show/:id',
    name: 'editNotifications',
    component: editNotifications,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router