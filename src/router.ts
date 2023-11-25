import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('./pages/quiz.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
