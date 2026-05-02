import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Index from '../components/Index.vue';
import Form from '../components/Form.vue';
import Form_OK from '../components/Form_OK.vue';

import ReviewForms from '../components/AdminPages/ReviewForms.vue';
import UserManagement from '../components/AdminPages/UserManagement.vue';
import DepartmentsManagement from '../components/AdminPages/DepartmentsManagement.vue';
import AdminLogin from '../components/AdminPages/AdminLogin.vue';
import Logout from '../components/AdminPages/Logout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
  },
  {
    path: '/form/success',
    name: 'Form succesfully sent',
    component: Form_OK,
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path:'/admin/review',
    name:'ReviewForms',
    component: ReviewForms,
  },
  {
    path:'/admin/users',
    name: 'Gestionar usuarios',
    component: UserManagement,
  },
  {
    path:'/admin/departments',
    name: 'Gestionar subdelegaciones',
    component: DepartmentsManagement,
  },
  {
    path:'/admin/logout',
    name: 'Cerrar Sesión',
    component: Logout,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
