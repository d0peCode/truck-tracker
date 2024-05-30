<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Paginator from "primevue/paginator"
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from "primevue/dropdown"

import { FilterMatchMode } from 'primevue/api'
import type { Truck, TruckStatus } from '@/types/Trucks.ts'

defineProps<{
  trucks: Truck[]
  trucksAmount: number
  trucksStatuses: TruckStatus[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'search-truck', by: string, val: string): void
  (e: 'add-truck'): void
  (e: 'edit-truck', id: number): void
  (e: 'remove-truck', id: number): void
  (e: 'page-change', { page }: { page: number }): void
}>()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.IN },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
</script>

<template>
  <div class="card mt-4">
    <DataTable
      v-model:filters="filters"
      :value="trucks"
      :rows="10"
      data-key="id"
      filter-display="row"
      :loading="loading"
      :global-filter-fields="['id', 'code']"
    >
      <template #header class="rounded-t-md">
        <div class="flex justify-between">
          <InputText v-model="filters.global.value" class="min-w-80" placeholder="Client side keyword global search" />
          <Button label="Add new truck" @click="emit('add-truck')" />
        </div>
      </template>
      <template #empty>
        <p class="text-white">
          No trucks found.
        </p>
      </template>
      <template #loading>
        <p class="text-white">
          Loading trucks data. Please wait.
        </p>
      </template>
      <Column field="id" header="Id" :show-filter-menu="false" class="min-w-32">
        <template #body="{ data }">
          {{ data.id }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Query by id"
            @input="emit('search-truck', 'id', filterModel.value)"
          />
        </template>
      </Column>
      <Column header="Code" :show-filter-menu="false" filter-field="code" class="min-w-32">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data.code }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Query by code"
            @input="emit('search-truck', 'code', filterModel.value)"
          />
        </template>
      </Column>
      <Column header="Name" :show-filter-menu="false" filter-field="name" class="min-w-32">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text" class="p-column-filter"
            placeholder="Query by name"
            @input="emit('search-truck', 'name', filterModel.value)"
          />
        </template>
      </Column>
      <Column
        header="Status"
        filter-field="status"
        :show-filter-menu="false"
        :filter-menu-style="{ width: '14rem' }"
        class="min-w-32"
      >
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data.status }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <Dropdown
            v-model="filterModel.value"
            :options="trucksStatuses"
            placeholder="Any"
            class="p-column-filter min-w-56"
            :max-selected-labels="1"
            @change="emit('search-truck', 'status', filterModel.value)"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column header="Description" :show-filter-menu="false" filter-field="description" class="min-w-32">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span>{{ data.description || 'Description not provided' }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Query by description"
            @input="emit('search-truck', 'description', filterModel.value)"
          />
        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <button @click="emit('edit-truck', data.id)">
              <i class="pi pi-file-edit text-2xl" />
            </button>
            <button @click="emit('remove-truck', data.id)">
              <i class="pi pi-trash text-red-600 text-2xl" />
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      :total-records="trucksAmount"
      :rows="10"
      @page="emit('page-change', { page: $event.page + 1 })"
    />
  </div>
</template>