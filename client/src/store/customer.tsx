'use client'
import { create } from 'zustand'
import { TicketResponse } from '@/types/ticket'
import { CustomerResponse } from '@/types/customer'

interface UserState {
    user: CustomerResponse | null,
    staff: CustomerResponse | null,
    setUser: (users: CustomerResponse) => void,
    setStaff: (staff: CustomerResponse) => void,
}

export const customerStore = create<UserState>((set) => ({
    user: null,
    staff: null,
    setUser: (user) => set({ user }),
    setStaff: (staff) => set({ staff }),
}))