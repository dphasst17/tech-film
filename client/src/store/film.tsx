'use client'
import { create } from 'zustand'
import { FilmAll, FilmDetailType } from '@/types/film'

interface FilmState {
    films: FilmAll | null
    newFilm: FilmDetailType[] | null
    setFilms: (films: FilmAll) => void
    setNewFilm: (newFilm: FilmDetailType[]) => void
}

export const filmStore = create<FilmState>((set) => ({
    films: null,
    newFilm: null,
    setFilms: (films) => set({ films }),
    setNewFilm: (newFilm) => set({ newFilm }),
}))