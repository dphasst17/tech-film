'use client'
import StatisComponent from '@/components/admin/statis'
import { FilmIcon, NewFilmIcon } from '@/components/icon/film'
import { UserIcon, UserPlusIcon } from '@/components/icon/user'
import { StateContext } from '@/contexts/state'
import { FilmDetailType } from '@/types/film'
import { formatDate } from '@/utils/util'
import { Code } from '@nextui-org/react'
import React, { use, useEffect } from 'react'

const Statis = () => {
    const { statis } = use(StateContext)
    return <div className='w-[90%] h-auto min-h-[10vh] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2'>
        <div className='feature col-span-2 h-[200px] rounded-md'>
            {statis && statis.film?.top.map((f: FilmDetailType, i: number) => i === 0 && <div className='relative w-full h-full rounded-md flex' key={i}>
                <div className='absolute insert-0 z-0 w-full h-[200px] bg-zinc-950 bg-opacity-45 rounded-md'>
                    <img alt="Top-film" loading='lazy' src={f.background} className='w-full h-full object-cover rounded-md' />
                </div>
                <div className='info w-full h-full z-10 grid grid-cols-3 bg-zinc-950 bg-opacity-65'>
                    <div className='col-span-1 h-full flex items-center justify-center'>
                        <img alt="Top-film" loading='lazy' src={f.thumbnails} className='h-[190px] object-cover rounded-md' />
                    </div>
                    <div className='h-full col-span-2 text-white flex flex-wrap justify-around content-around' >
                        <span className='flex justify-center text-center text-2xl'>{f.title}</span>
                        <Code className='min-w-[110px] bg-zinc-950 text-white p-2'>{f.director}</Code>
                        <Code className='min-w-[110px] bg-zinc-950 text-white p-2'>{f.time}</Code>
                        <Code className='min-w-[110px] bg-zinc-950 text-white p-2'>{formatDate(f.release)}</Code>
                    </div>
                </div>
            </div>)}
        </div>
        {
            statis && statis.film && <>
                <StatisComponent title='Total films' value={statis.film?.total.toString()} Icon={FilmIcon} />
                <StatisComponent title='New films' value={statis.film?.new.toString()} Icon={NewFilmIcon} />
            </>
        }
        {
            statis && statis.user && <>
                <StatisComponent title='Total users' value={statis.user?.total.toString()} Icon={UserIcon} />
                <StatisComponent title='New users' value={statis.user?.new.toString()} Icon={UserPlusIcon} />
            </>
        }
    </div>
}

export default Statis