import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/zod',
      name: 'zod',
      component: () => import('../views/ZodValidation.vue'),
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('../views/forms/index.vue'),
      children: [
        {
          path: '',
          name: 'form-1',
          component: () => import('../views/forms/FormOne.vue'),
        },
        {
          path: 'form-2',
          name: 'form-2',
          component: () => import('../views/forms/FormTwo.vue'),
        },
      ],
    },
  ],
})

export default router
