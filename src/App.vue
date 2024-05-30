<script setup lang="ts">
import Toast from 'primevue/toast'
import AppNav from '@/components/AppNav.vue'
</script>

<template>
  <div>
    <Toast />
    <AppNav />
    <RouterView />
  </div>
</template>
