import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Home from '@/components/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'HelloWorld',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
