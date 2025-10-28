import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TradeView from '../views/TradeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/trade',
    name: 'trade',
    component: TradeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
