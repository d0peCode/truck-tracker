<script setup lang="ts">
import {computed, ref } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { TruckService } from '@/service/TruckService.ts'
import type { Truck, TruckStatus } from '@/types/Trucks.ts'
import { useAlphanumericInput } from '@/composables/useAlphanumericInput.ts'

const props = defineProps<{
  truckId: number | string
  trucksStatuses: TruckStatus[]
}>()

const emit = defineEmits<{
  (e: 'edit-truck'): void
}>()

const initialTruckData = ref<Partial<Truck>>()
const truck = ref<Partial<Truck>>({
  code: '',
  name: '',
  status: '',
  description: '',
})

const visible = defineModel<boolean>()
const toast = useToast()

const isFormValid = computed(() => {
  return !(truck.value?.code && truck.value?.name && truck.value?.status)
})

const statusesOptions = computed(() => {
  const currentStatus = initialTruckData.value?.status;

  const statusOrder = ['LOADING', 'TO_JOB', 'AT_JOB', 'RETURNING'];

  return props.trucksStatuses.filter((status: TruckStatus) => {
    if (status === 'OUT_OF_SERVICE') return true;

    if (currentStatus === 'OUT_OF_SERVICE') return true;

    const currentIndex = statusOrder.indexOf(currentStatus as TruckStatus);
    const nextIndex = statusOrder.indexOf(status);

    // Check if status is a valid next status in the sequence
    if (currentIndex !== -1 && nextIndex === currentIndex + 1) return true;

    // Allow "RETURNING" to "LOADING" transition
    return currentStatus === 'RETURNING' && status === 'LOADING';
  }).map((status: TruckStatus) => ({
    label: status.replaceAll('_', ' '),
    value: status,
  }));
});

async function getTruck() {
  truck.value = await TruckService.getTruck(props.truckId, toast)
  initialTruckData.value = { ...truck.value }
}

async function editTruck() {
  if (!truck.value)
    return
  const res = await TruckService.editTruck(truck.value, toast)
  if (!res)
    return
  emit('edit-truck')
}

const { handleKeydown, handlePaste } = useAlphanumericInput((_, value) => {
  truck.value.code = value
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit truck"
    class="w-96 max-w-[40rem]"
    @show="getTruck"
  >
    <form class="flex flex-col" @submit.prevent="editTruck">
      <InputText
        v-model="truck.code"
        placeholder="Code"
        class="my-1"
        required
        @keydown="handleKeydown"
        @paste="handlePaste"
      />
      <InputText v-model="truck.name" placeholder="Name" class="my-1" required />
      <Dropdown
        v-model="truck.status"
        :options="statusesOptions"
        option-label="label"
        option-value="value"
        :placeholder="truck.status"
        class="my-1"
      />
      <Textarea v-model="truck.description" placeholder="Description" rows="5" cols="30" class="my-1" />
      <div :class="{ 'cursor-not-allowed': isFormValid }">
        <Button label="Save" type="submit" class="mt-4 w-full" :disabled="isFormValid" />
      </div>
    </form>
  </Dialog>
</template>
