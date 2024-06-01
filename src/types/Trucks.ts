type TruckStatus = 'OUT_OF_SERVICE' | 'LOADING' | 'TO_JOB' | 'AT_JOB' | 'RETURNING' | ''

interface Truck {
  id: number
  code: string
  name: string
  status: TruckStatus
  description: string
}

interface TruckSorters {
  sort: string | null
  order: string | null
}

export type { Truck, TruckStatus, TruckSorters }
