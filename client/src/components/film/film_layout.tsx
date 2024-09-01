'use client'
import { FilmDetailType } from '@/types/film'
import { formatDate } from '@/utils/util'
import { useRouter } from 'next/navigation'

const FilmLayout = ({ data, key }: { data: FilmDetailType, key: string }) => {
    const router = useRouter()
    const handleNavigate = (url: string) => {
        router.push(url)
    }
    return <div className='group h-[500px] rounded-md cursor-pointer'>
        <div className='relative w-full h-full rounded-md group-hover:scale-105 transition-all'
            onClick={() => handleNavigate(`/film/detail/${data._id}/${data.title}`)}>
            <div className='thumbnails absolute w-full h-full inset-0 z-0 rounded-md'>
                <img src={data.background} className='w-full h-full object-cover rounded-md' loading='lazy' alt={`${data.title}`} />
            </div>
            <div className="overlay absolute w-full h-full top-0 left-0 z-0 bg-zinc-950 bg-opacity-65 rounded-md"></div>
            <div className='w-full h-full flex flex-wrap items-center justify-center'>
                <div className='thumbnails w-full h-2/5 flex items-center justify-center'>
                    <img src={data.thumbnails} className='w-[180px] h-full object-cover z-10 rounded-md' loading='lazy' alt={`${data.title}`} />
                </div>
                <span className='w-full text-center text-3xl font-bold text-white z-10'>{data.title}</span>
                <span className='text-center text-3xl font-bold text-white z-10'>{formatDate(data.release)}</span>
            </div>
        </div>
    </div>
}

export default FilmLayout