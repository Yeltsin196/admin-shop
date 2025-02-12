<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue'
import CustomFooter from '../components/CustomFooter.vue'
</script>

<template>
  <!-- Create By Joker Banny -->

  <!-- Header Navbar -->
  <TopMenu />

  <router-view></router-view>
  <!-- Footer -->
  <CustomFooter />
</template>
