<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'
interface Props {
  page: number
  isFistPage: boolean
  hasMoreData: boolean
}
defineProps<Props>()
</script>

<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      :disabled="isFistPage"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center rounded-lg px-4 py-1.5 text-white space-x-1.5 bg-blue-500 disabled:bg-gray-300 transition-all"
    >
      <ArrowLeftIcon />
      <span>Anteriores</span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center rounded-lg px-4 py-1.5 text-white space-x-1.5 bg-blue-500 disabled:bg-gray-300 transition-all"
    >
      <span>Siguientes</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>
