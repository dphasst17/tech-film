'use client'
export const getTicketByUser = async (token: string, page?: string, limit?: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/ticket/user?page=${page || 1}&limit=${limit || 3}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const getSeatSelectByFilm = async (idFilm: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/ticket/seat/${idFilm}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}
export const getSeatDetail = async (data: { date: string, time: string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/ticket/seat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: data.date, time: data.time })
    })
        .then(res => res.json())
}

export const createTicket = async (token: string, data: { [x: string]: string | number | boolean | number[] }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}
export const updateStatusSeat = async (id: string, data: { [x: string]: string | number | boolean | number[] }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/ticket`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, detail: data })
    })
        .then(res => res.json())
}