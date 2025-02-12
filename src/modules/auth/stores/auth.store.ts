import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../interfaces/user.interface'
import { AuthStatus } from '../interfaces'
import { loginAction } from '../actions/login.action'
import { useLocalStorage } from '@vueuse/core'
import { checkAuthAction, registerAction } from '../actions'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password)
      if (!loginResp.ok) return false

      user.value = loginResp.user
      token.value = loginResp.token
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      console.log(error)
      logout()
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    try {
      const registerResp = await registerAction(email, password, fullName)
      if (!registerResp.ok) {
        logout()
        return { ok: false, message: registerResp.message }
      }

      user.value = registerResp.user
      token.value = registerResp.token
      authStatus.value = AuthStatus.Authenticated
      return {
        ok: true,
        message: 'Usuario registrado correctamente',
      }
    } catch (error) {
      console.log(error)
      return { ok: false, message: 'error al registrar usuario' }
    }
  }

  const logout = () => {
		localStorage.removeItem('token')
    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = ''
    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
		
    try {
      const statusResp = await checkAuthAction()
      if (!statusResp.ok) {
        logout()
        return false
      }
      authStatus.value = AuthStatus.Authenticated
      user.value = statusResp.user
      token.value = statusResp.token
      return true
    } catch (error) {
      console.log(error)
      logout()
      return false
    }
  }

  return {
    user,
    token,
    authStatus,
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.fullName),
		isAdmin: computed(() => user.value?.roles.includes('admin') ?? false ),
		logout: logout,
    login,
    register,
    checkAuthStatus,
  }
})
