import { createMemoryHistory, createRouter } from 'vue-router'

import TrucksView from '../views/TrucksView.vue'

const routes = [
  { path: '/', component: TrucksView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export { router }
