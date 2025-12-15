import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Index from '../components/Index.vue';
import Form from '../components/Form.vue';
import Home from '../components/Home.vue';

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
    path:'/home',
    name:'Home',
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
