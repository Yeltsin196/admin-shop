<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">email</label>
      <input
        v-model="myForm.email"
        ref="emailInputRef"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        v-model="myForm.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        v-model="myForm.rememberMe"
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        class="text-blue-500"
      />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Sign up Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref,watchEffect } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification';

const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const toast= useToast()
const myForm = reactive({
  email: '',
  password: '',
  rememberMe: true,
})

const authStore = useAuthStore()
const onLogin = async () => {
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }

	if (myForm.password.length < 6) {
		return passwordInputRef.value?.focus()
	}

	if(myForm.rememberMe) {
		localStorage.setItem('email', myForm.email)
	} else {
		localStorage.removeItem('email')

	}

  const ok = await authStore.login(myForm.email, myForm.password)
	
	if(ok) return ;
  toast.error('Invalid email or password')
}
watchEffect(() => {
	const email = localStorage.getItem('email')
	if(email) {
		myForm.email = email
		myForm.rememberMe = true
	}
	

})
</script>
