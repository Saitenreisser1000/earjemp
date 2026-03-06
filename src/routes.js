import { createRouter, createWebHashHistory } from 'vue-router'
import intervalJemp from "@/components/intervalJemp/intervalJemp";
import chordJemp from "@/components/chordjemp/chordJemp";
import scaleJemp from "@/components/scaleJemp/scaleJemp";

const routes = [
  { path: '/', component: intervalJemp },
  { path: '/chordJemp', component: chordJemp },
  { path: '/scaleJemp', component: scaleJemp }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
