//create user store using zustand
'use client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '@/types/user'
import { TicketByUser } from '@/types/ticket'

interface UserState {
    users: User[] | null,
    ticket: TicketByUser[] | null,
    setUsers: (users: User[]) => void,
    setTicket: (ticket: TicketByUser[]) => void
}

export const userStore = create<UserState>((set) => ({
    users: null,
    ticket: null,
    setUsers: (users) => set({ users }),
    setTicket: (ticket) => set({ ticket })
}))