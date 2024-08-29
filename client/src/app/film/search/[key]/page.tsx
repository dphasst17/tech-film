'use client'
import FilmLayout from '@/components/film/film_layout'
import React, { useEffect, useState } from 'react'
import { FilmAll } from '@/types/film';
import { Card, Pagination } from '@nextui-org/react';
import { getFilms, searchFilm } from '@/api/film';
import CustomCard from '@/components/film/custom_card';
import { useParams } from 'next/navigation';
import { useFetchDataByKey } from '@/hooks/useFetch';

const FilmSearch = () => {
    const param = useParams()
    const { data: result, err } = useFetchDataByKey('film', 'searchFilm', { key: param.key as string })
    const [data, setData] = useState<FilmAll | null>(null)
    const [activePage, setActivePage] = useState<number>(1)
    const [pending, setPending] = useState<boolean>(false)
    useEffect(() => {
        result && setData(result)
    }, [result])
    const handlePagination = (page: number) => {
        data && page <= data?.totalPage && (
            setPending(true),
            searchFilm({ key: param.key as string, page: page.toString(), limit: '10' }).then(res => {
                if (res.status === 200) setData({ ...data, detail: res.data.detail, page: page })
                if (res.status === 200) setPending(false)
            }),
            setActivePage(page)
        )
    }
    return <div className='w-full h-auto flex flex-col justify-center items-center pb-10'>
        <div className='title w-full font-tech-shark text-7xl text-white text-center mb-10'>SEARCH</div>
        <div className='w-[90%] h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4'>
            {!pending && data && data.detail.map((c, i) => <FilmLayout data={c} key={`film-${i}`} />)}
            {pending && [...Array(10)].map((c, i) => <CustomCard key={`film-${i}`} />)}
        </div>
        {data && <Pagination className='mt-10' isCompact size="lg" showControls page={activePage} total={data.totalPage}
            initialPage={1} onChange={(e) => handlePagination(e)} />}
    </div>
}

export default FilmSearch