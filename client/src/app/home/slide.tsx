'use client'
import { filmStore } from "@/store/film";
import { formatDate } from "@/utils/util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const SlideShow = () => {
    const router = useRouter()
    const { newFilm } = filmStore()
    const [indexActive, setIndexActive] = useState(0)
    /* const next = () => {
        indexActive === 3 ? setIndexActive(0) : setIndexActive(indexActive + 1)
    }
    const prev = () => {
        indexActive === 0 ? setIndexActive(2) : setIndexActive(indexActive - 1)
    } */
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexActive(indexActive => indexActive === 3 ? 0 : indexActive + 1);
        }, 7000);
        return () => clearInterval(interval); // Hủy interval khi component unmount
    }, []);
    return <section className="relative slide-show w-full h-[700px] flex items-center justify-around animateOpacity transition-all mb-10">
        <div className="relative w-[100%] h-full flex flex-wrap items-end overflow-hidden z-20">
            <div className="absolute w-full h-full z-10 bg-zinc-950 bg-opacity-50"></div>
            {newFilm !== null && newFilm.slice(0, 4).map((c, i) =>
                <img className={`${i === indexActive ? 'block' : 'hidden'} absolute w-full h-full object-cover animateShowItems z-0 transition-all`}
                    src={c.background} key={`${i}slide-background-${c.id}`} alt={`${i}slide-background-${c.id}`} loading='lazy' />)}
            {newFilm !== null && newFilm.slice(0, 4).map((c, i) =>
                <div
                    className={`${i === indexActive ? 'flex' : 'hidden'} w-full h-2/4 overflow-hidden flex-wrap flex-col justify-center 
                items-center content-center mb-4  rounded-lg z-10 transition-all`} key={`${i}slide-info-${c.id}`}>
                    <span
                        onClick={() => { router.push(`/film/detail/${c._id}/${c.title}`) }}
                        className="w-3/4 lg:w-2/4 2xl:w-full h-auto xl:max-h-[220px] flex items-center justify-center font-tech-shark text-7xl text-white rounded-lg text-center cursor-pointer">{c.title}</span>
                    <span className="w-[180px] h-[40px] flex items-center justify-center my-2 font-tech-shark text-5xl cursor-pointer rounded-lg text-red-600">
                        {formatDate(c.release)}
                    </span>
                </div>
            )}
            <div className="w-full h-2/4 flex items-center justify-center p-1 z-20">
                {newFilm !== null && newFilm.slice(0, 4).map((c, i) =>
                    <img onClick={() => { setIndexActive(i) }}
                        className={`${i === indexActive ? 'w-[180px] h-[260px] border-[3px] border-solid border-red-600 rounded-lg' : 'w-[150px] h-[230px]'} 
                mx-2 mb-4 transition-all z-10`} src={c.thumbnails}
                        key={`${i}slide-thumb-${c.id}`} alt={`${i}slide-thumb-${c.id}`} loading="lazy" />)}
            </div>

        </div>

    </section>
}
export default SlideShow