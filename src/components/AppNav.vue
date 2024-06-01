<script setup lang="ts">
import { ref } from 'vue'
import MegaMenu from 'primevue/megamenu'

const root = document.getElementsByTagName('html')[0]
const iconClass = ref(
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'pi-sun'
    : 'pi-moon',
)

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    event.matches
      ? iconClass.value = 'pi-sun'
      : iconClass.value = 'pi-moon'
  })

function changeTheme() {
  root.classList.toggle('dark')
  iconClass.value = iconClass.value === 'pi-moon' ? 'pi-sun' : 'pi-moon'
}
</script>

<template>
  <MegaMenu class="w-full h-16 shadow-md flex justify-between p-2">
    <template #start>
      <router-link
        to="/"
        class="flex flex-col items-center justify-center rounded-lg w-52 min-h-full text-white italic bg-gradient-to-r from-lime-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
      >
        <h1 class="font-black text-3xl leading-8">
          Truck
        </h1>
        <h2 class="text-xs">
          Tracker
        </h2>
      </router-link>
    </template>
    <template #end>
      <button
        type="button"
        class="inline-flex border w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border-surface-200 dark:border-surface-600 rounded"
        @click="changeTheme"
      >
        <i :class="`dark:text-white pi ${iconClass}`" />
      </button>
    </template>
  </MegaMenu>
</template>
