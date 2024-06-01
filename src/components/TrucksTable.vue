<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Paginator from 'primevue/paginator'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

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
  (e: 'sort-trucks', by: string): void
  (e: 'add-truck'): void
  (e: 'edit-truck', id: number): void
  (e: 'remove-truck', id: number): void
  (e: 'page-change', { page }: { page: number }): void
}>()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
      :global-filter-fields="['id', 'code', 'name', 'status', 'description']"
    >
      <template #header>
        <div class="flex justify-between">
          <InputText v-model="filters.global.value" class="min-w-80" placeholder="Client side search (current page only)" />
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
      <Column
        field="id"
        header="Id"
        :show-filter-menu="false"
        :show-clear-button="false"
        class="min-w-32 max-w-[20%]"
      >
        <template #body="{ data }">
          <div class="flex align-items-center gap-2 break-all max-h-52 overflow-auto">
            <span>{{ data.id }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <div class="flex justify-center items-center">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Query by id"
              @input="emit('search-truck', 'id', filterModel.value)"
            />
            <button @click="emit('sort-trucks', 'id')">
              <i class="pi pi-sort text-2xl ml-2" />
            </button>
          </div>
        </template>
      </Column>
      <Column
        header="Code"
        :show-filter-menu="false"
        :show-clear-button="false"
        filter-field="code"
        class="min-w-32 max-w-[20%]"
      >
        <template #body="{ data }">
          <div class="flex align-items-center gap-2 break-all max-h-52 overflow-auto">
            <span>{{ data.code }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <div class="flex justify-center items-center">
            <InputText
              v-model="filterModel.value"
              type="text"
              class="p-column-filter"
              placeholder="Query by code"
              @input="emit('search-truck', 'code', filterModel.value)"
            />
            <button @click="emit('sort-trucks', 'code')">
              <i class="pi pi-sort text-2xl ml-2" />
            </button>
          </div>
        </template>
      </Column>
      <Column
        header="Name"
        :show-filter-menu="false"
        :show-clear-button="false"
        filter-field="name"
        class="min-w-32 max-w-[20%]"
      >
        <template #body="{ data }">
          <div class="flex align-items-center gap-2 break-all max-h-52 overflow-auto">
            <span>{{ data.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <div class="flex justify-center items-center">
            <InputText
              v-model="filterModel.value"
              type="text" class="p-column-filter"
              placeholder="Query by name"
              @input="emit('search-truck', 'name', filterModel.value)"
            />
            <button @click="emit('sort-trucks', 'name')">
              <i class="pi pi-sort text-2xl ml-2" />
            </button>
          </div>
        </template>
      </Column>
      <Column
        header="Status"
        filter-field="status"
        :show-filter-menu="false"
        :show-clear-button="false"
        :filter-menu-style="{ width: '14rem' }"
        class="min-w-32 max-w-[20%]"
      >
        <template #body="{ data }">
          <div class="flex align-items-center gap-2 break-all max-h-52 overflow-auto">
            <span>{{ data.status }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <div class="flex justify-center items-center">
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
            <button @click="emit('sort-trucks', 'status')">
              <i class="pi pi-sort text-2xl ml-2" />
            </button>
          </div>
        </template>
      </Column>
      <Column
        header="Description"
        :show-filter-menu="false"
        filter-field="description"
        class="min-w-32 max-w-[20%]"
      >
        <template #body="{ data }">
          <div class="flex align-items-center gap-2 break-all max-h-52 overflow-auto">
            <span>{{ data.description || '-' }}</span>
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
      <Column header="Actions">
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
