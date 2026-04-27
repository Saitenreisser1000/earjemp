import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/intervalJemp/intervalJemp'),
  },
  {
    path: '/chordJemp',
    component: () => import('@/components/chordjemp/chordJemp'),
  },
  {
    path: '/scaleJemp',
    component: () => import('@/components/scaleJemp/scaleJemp'),
  },
  {
    path: '/melodyJemp',
    component: () => import('@/components/melodyJemp/melodyJemp'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
