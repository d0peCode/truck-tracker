<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { TruckService } from '@/service/TruckService.ts'
import type { Truck, TruckStatus } from '@/types/Trucks.ts'

const props = defineProps<{
  truckId: number | string
  trucksStatuses: TruckStatus[]
}>()

const emit = defineEmits<{
  (e: 'edit-truck'): void
}>()

const truck = ref<Partial<Truck>>({
  code: '',
  name: '',
  status: '',
  description: ''
})

const visible = defineModel<boolean>()
const toast = useToast()

const isFormValid = computed(() => {
  return !(truck.value?.code && truck.value?.name && truck.value?.status)
})

const getTruck = async () => {
  truck.value = await TruckService.getTruck(props.truckId, toast)
}

async function editTruck() {
  if (!truck.value) return
  const res = await TruckService.editTruck(truck.value, toast)
  if (!res) return
  emit('edit-truck')
}

onMounted(async () => getTruck())
</script>

<template>
  <Dialog
      v-model:visible="visible"
      modal
      header="Edit truck"
      class="w-96"
  >
    <form class="flex flex-col" @submit.prevent="editTruck">
      <InputText v-model="truck.code" placeholder="Code" class="my-1" required />
      <InputText v-model="truck.name" placeholder="Name" class="my-1" required />
      <Dropdown v-model="truck.status" :options="trucksStatuses" placeholder="Status" class="my-1" />
      <Textarea v-model="truck.description" placeholder="Description" rows="5" cols="30" class="my-1" />
      <Button label="Save" type="submit" class="mt-4" :disabled="isFormValid" />
    </form>
  </Dialog>
</template>