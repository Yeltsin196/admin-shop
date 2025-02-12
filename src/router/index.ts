import { adminRoutes } from '@/modules/admin/routes'
import { authRoutes } from '@/modules/auth/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../modules/shop/layouts/ShopLayout.vue'),
			redirect: { name: 'shop-home' },
      children: [
        {
          path: '',
          name: 'shop-home',
          component: () => import('../modules/shop/views/HomeView.vue'),
        },
      ],
    },
		authRoutes, 
		adminRoutes,
  ],
})

export default router
