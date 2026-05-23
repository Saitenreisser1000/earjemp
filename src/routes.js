import { createRouter, createWebHashHistory } from 'vue-router'
import intervalJemp from "@/components/intervalJemp/intervalJemp";
import chordJemp from "@/components/chordjemp/chordJemp";
import scaleJemp from "@/components/scaleJemp/scaleJemp";
import melodyJemp from "@/components/melodyJemp/melodyJemp";
import about from "@/components/about/about";

const routes = [
  { path: '/', component: intervalJemp },
  { path: '/chordJemp', component: chordJemp },
  { path: '/scaleJemp', component: scaleJemp },
  { path: '/melodyJemp', component: melodyJemp },
  { path: '/about', component: about }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
