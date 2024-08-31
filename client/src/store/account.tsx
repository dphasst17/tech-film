'use client'
import { create } from 'zustand'
import { User } from '@/types/user'
import { TicketResponse } from '@/types/ticket'

interface UserState {
    users: User[] | null,
    ticket: TicketResponse | null,
    setUsers: (users: User[]) => void,
    setTicket: (ticket: TicketResponse) => void
}

export const accountStore = create<UserState>((set) => ({
    users: null,
    ticket: null,
    setUsers: (users) => set({ users }),
    setTicket: (ticket) => set({ ticket })
}))