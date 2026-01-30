import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Index from '../components/Index.vue';
import Form from '../components/Form.vue';

import ReviewForms from '../components/AdminPages/ReviewForms.vue';
import UserManagement from '../components/AdminPages/UserManagement.vue';
import DepartmentsManagement from '../components/AdminPages/DepartmentsManagement.vue';

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
    path:'/home/review',
    name:'ReviewForms',
    component: ReviewForms,
  },
  {
    path:'/home/users',
    name: 'Gestionar usuarios',
    component: UserManagement,
  },
  {
    path:'/Home/departments',
    name: 'Gestionar subdelegaciones',
    component: DepartmentsManagement,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
