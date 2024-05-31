import axios from 'axios'
import type { useToast } from 'primevue/usetoast'
import AxiosInstance from '@/lib/axios.ts'
import type { Truck } from '@/types/Trucks.ts'

export const TruckService = {
  async getTrucks(params: Record<string, string | null> = {}, toast: ReturnType<typeof useToast>) {
    try {
      const response = await AxiosInstance.get('/trucks', {
        params,
      })
      return {
        data: response.data,
        totalAmount: response.headers['x-total-count'],
      }
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        toast.add({
          severity: 'error',
          summary: 'Can not fetch trucks',
          detail: e.response?.data.status,
          life: 3000
        })
      }
    }
  },

  async getTruck(truckId: number | string, toast: ReturnType<typeof useToast>) {
    try {
      const { data } = await AxiosInstance.get(`/trucks/${truckId}`)
      return data
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        toast.add({
          severity: 'error',
          summary: 'Can not fetch truck',
          detail: e.response?.data.status,
          life: 3000
        })
      }
    }
  },

  async addTruck(payload: Partial<Truck>, toast: ReturnType<typeof useToast>) {
    try {
      const { data } = await AxiosInstance.post('/trucks', payload)
      return data
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        toast.add({
          severity: 'error',
          summary: 'Can not add truck',
          detail: e.response?.data.code,
          life: 3000
        })
      }
    }
  },

  async editTruck(payload: Partial<Truck>, toast: ReturnType<typeof useToast>) {
    try {
      const { data } = await AxiosInstance.put(`/trucks/${payload.id}`, payload)
      return data
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        toast.add({
          severity: 'error',
          summary: 'Can not edit truck',
          detail: e.response?.data.code,
          life: 3000
        })
      }
    }
  },

  async removeTruck(truckId: string | number, toast: ReturnType<typeof useToast>) {
    try {
      const { data } = await AxiosInstance.delete(`/trucks/${truckId}`)
      return data
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        toast.add({
          severity: 'error',
          summary: 'Can not remove truck',
          detail: e.response?.data.code,
          life: 3000
        })
      }
    }
  },
}
