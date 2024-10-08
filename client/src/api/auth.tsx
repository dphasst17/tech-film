'use client'
import { AuthRequest } from "@/types/auth"

export const login = async (data: AuthRequest) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const register = async (data: AuthRequest) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const forgotPassword = async (data: AuthRequest) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const resetPassword = async (token: string, data: { current: string, password: string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const newToken = async (token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}