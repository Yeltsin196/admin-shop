
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'


const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  await authStore.checkAuthStatus()
  if (authStore.isAdmin) {
    next()
  } else {
    next({ name: 'shop' })
  }
  
}

export default isAdminGuard
