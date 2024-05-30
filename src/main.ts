import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { router } from './router'
import App from './App.vue'
import { themeManager } from '@/lib/themeManager.ts'

import Coldrun from '@/presets/coldrun'

import 'primeicons/primeicons.css'
import './style.css'

themeManager()

createApp(App)
  .use(router)
  .use(PrimeVue, { unstyled: true, pt: Coldrun })
  .use(ToastService)
  .mount('#app')
