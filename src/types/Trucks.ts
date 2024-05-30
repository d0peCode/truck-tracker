type TruckStatus = 'OUT_OF_SERVICE' | 'LOADING' | 'TO_JOB' | 'AT_JOB' | 'RETURNING' | ''

interface Truck {
  id: number
  code: string
  name: string
  status: TruckStatus
  description: string
}

export type { Truck, TruckStatus }
