'use client'
import FilmLayout from '@/components/film/film_layout'
import { filmStore } from '@/store/film'
import React from 'react'

const Showing = () => {
    const { showing } = filmStore()
    return <div className='w-[90%] h-auto grid grid-cols-1 gap-2 mx-auto my-10'>
        <div className='title w-full font-tech-shark text-7xl text-white text-center'>NOW SHOWING</div>
        <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {showing !== null && showing.map((c, i) => <FilmLayout data={c} key={`new-${i}`} />)}
        </div>
    </div>
}

export default Showing