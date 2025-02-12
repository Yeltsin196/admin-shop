<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input
        v-model="myForm.fullName"
        ref="fullNameInputRef"
        type="text"
        id="fullName"
        name="fullName"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
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

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Register
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification'

const fullNameInputRef = ref<HTMLInputElement | null>(null)
const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const toast = useToast()
const myForm = reactive({
  email: '',
  password: '',
  fullName: '',
})

const authStore = useAuthStore()
const onRegister = async () => {
	
  if (myForm.fullName.length < 2) {
    return emailInputRef.value?.focus()
  }
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }
  if (myForm.password.length < 6) {
    return passwordInputRef.value?.focus()
  }
	
  const { ok, message } = await authStore.register(myForm.email, myForm.password, myForm.fullName)

  if (ok) return
  toast.error(message)
}
</script>
