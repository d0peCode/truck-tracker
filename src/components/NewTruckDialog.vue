<script setup lang="ts">
import {computed, ref} from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { TruckService } from '@/service/TruckService.ts'
import type { Truck, TruckStatus } from '@/types/Trucks.ts'

defineProps<{
  trucksStatuses: TruckStatus[]
}>()

const emit = defineEmits<{
  (e: 'add-truck'): void
}>()

const visible = defineModel<boolean>()
const toast = useToast()

const initialState: Partial<Truck> = {
  code: '',
  name: '',
  status: '',
  description: '',
}

const newTruck = ref<Partial<Truck>>({ ...initialState })

const isFormValid = computed(() => {
  return !(newTruck.value.code && newTruck.value.name && newTruck.value.status)
})

async function addTruck() {
  const res = await TruckService.addTruck(newTruck.value, toast)
  if (!res) return
  newTruck.value = { ...initialState }
  emit('add-truck')
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add truck"
    class="w-96"
  >
    <form class="flex flex-col" @submit.prevent="addTruck">
      <InputText v-model="newTruck.code" placeholder="Code" class="my-1" required />
      <InputText v-model="newTruck.name" placeholder="Name" class="my-1" required />
      <Dropdown v-model="newTruck.status" :options="trucksStatuses" placeholder="Status" class="my-1" />
      <Textarea v-model="newTruck.description" placeholder="Description" rows="5" cols="30" class="my-1" />
      <Button label="Save" type="submit" class="mt-4" :disabled="isFormValid" />
    </form>
  </Dialog>
</template>