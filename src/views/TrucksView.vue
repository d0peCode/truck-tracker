<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { useToast } from 'primevue/usetoast'
import type { Truck, TruckSorters, TruckStatus } from '@/types/Trucks.ts'
import { TruckService } from '@/service/TruckService.ts'

import TrucksTable from '@/components/TrucksTable.vue'
import NewTruckDialog from '@/components/NewTruckDialog.vue'
import EditTruckDialog from '@/components/EditTruckDialog.vue'

const toast = useToast()

const trucks = ref<Truck[]>([])
const trucksAmount = ref(0)
const currentTruckId = ref<string | number>()
const trucksLoading = ref(true)
const newTruckDialogOpen = ref(false)
const editTruckDialogOpen = ref(false)
const sorters = ref<TruckSorters>({ sort: null, order: null })

const trucksStatuses = ref<TruckStatus[]>(['OUT_OF_SERVICE', 'LOADING', 'TO_JOB', 'AT_JOB', 'RETURNING'])

const searchTruck = useDebounceFn(async (by: string, val: string = '') => {
  await fetchTrucks({ [by]: val || null })
}, 300)

async function sortTrucks(by: string) {
  sorters.value.sort = by
  sorters.value.order === 'asc' || !sorters.value.order
    ? sorters.value.order = 'desc'
    : sorters.value.order = 'asc'
  await fetchTrucks()
}

async function fetchTrucks(params = {}) {
  trucksLoading.value = true
  const trucksResponse = await TruckService.getTrucks({ ...params, ...sorters.value }, toast)
  trucks.value = trucksResponse?.data
  trucksAmount.value = +trucksResponse?.totalAmount
  trucksLoading.value = false
}

async function removeTruck(truckId: string | number) {
  trucks.value = await TruckService.removeTruck(truckId, toast)
  await fetchTrucks()
}

function editTruck(id: string | number) {
  currentTruckId.value = id
  editTruckDialogOpen.value = true
}

async function trucksChanged() {
  await fetchTrucks()
  newTruckDialogOpen.value = false
  editTruckDialogOpen.value = false
}

onMounted(async () => await fetchTrucks())
</script>

<template>
  <TrucksTable
    :trucks="trucks"
    :trucks-amount="trucksAmount"
    :trucks-statuses="trucksStatuses"
    :loading="trucksLoading"
    @page-change="fetchTrucks"
    @search-truck="searchTruck"
    @sort-trucks="sortTrucks"
    @add-truck="newTruckDialogOpen = true"
    @edit-truck="editTruck"
    @remove-truck="removeTruck"
  />
  <NewTruckDialog
    v-model="newTruckDialogOpen"
    :trucks-statuses="trucksStatuses"
    @add-truck="trucksChanged"
  />
  <EditTruckDialog
    v-if="currentTruckId"
    v-model="editTruckDialogOpen"
    :truck-id="currentTruckId"
    :trucks-statuses="trucksStatuses"
    @edit-truck="trucksChanged"
  />
</template>
