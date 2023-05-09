import { createRouter, createWebHistory } from 'vue-router'
import HomeView from 'views/HomeView.vue'
import PetView from 'views/PetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pet/:id',
      name: 'pet',
      component: PetView
    }
  ]
})

export default router
