'use client'
import FilmLayout from '@/components/film/film_layout'
import { filmStore } from '@/store/film'
import React, { useEffect, useState } from 'react'
import { FilmAll } from '@/types/film';
import { Card, Pagination } from '@nextui-org/react';
import { getFilms } from '@/api/film';
import CustomCard from '@/components/film/custom_card';

const FilmIndex = () => {
    const { films } = filmStore()
    const [data, setData] = useState<FilmAll | null>(null)
    const [activePage, setActivePage] = useState<number>(1)
    const [pending, setPending] = useState<boolean>(false)
    useEffect(() => {
        films && setData(films)
    }, [films])
    const handlePagination = (page: number) => {
        data && page <= data?.totalPage && (
            setPending(true),
            getFilms(page.toString()).then(res => {
                if (res.status === 200) setData({ ...data, detail: res.data.detail, page: page })
                if (res.status === 200) setPending(false)
            }),
            setActivePage(page)
        )
    }
    return <div className='w-full h-auto flex flex-col justify-center items-center pb-10'>
        <div className='title w-full font-tech-shark text-7xl text-white text-center mb-10'>FILM</div>
        <div className='w-[90%] h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4'>
            {!pending && data && data.detail.map((c, i) => <FilmLayout data={c} key={`film-${i}`} />)}
            {pending && [...Array(10)].map((c, i) => <CustomCard key={`film-${i}`} />)}
        </div>
        {data && <Pagination className='mt-10' isCompact size="lg" showControls page={activePage} total={data.totalPage}
            initialPage={1} onChange={(e) => handlePagination(e)} />}
    </div>
}

export default FilmIndex