'use client'

import { DataInsert } from "@/components/modal/film.add"

export const getFilms = async (page?: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film?page=${page || 1}`)
        .then(res => res.json())
}
export const getFilmDetail = async (id: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/detail/${id}`)
        .then(res => res.json())
}
export const getNewFilm = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/new`)
        .then(res => res.json())
}
export const getShowingFilm = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/showing`)
        .then(res => res.json())
}
export const createFilm = async (token: string, data: DataInsert) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const updateFilm = async (token: string, id: string, data: any) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const searchFilm = async (data: { key: string, page: string, limit: string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/search/${data.key}?page=${data.page || 1}&&limit=${data.limit || 10}`)
        .then(res => res.json())
}