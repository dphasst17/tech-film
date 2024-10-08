'use client'
import { useFetchDataByKey } from '@/hooks/useFetchData'
import { FilmDetailType } from '@/types/film'
import { useParams } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import BreadcrumbItems from './breadcrumb'
import { Button, ButtonGroup, Input } from '@nextui-org/react'
import Seat from './seat'
import { formatDate } from '@/utils/util'
import { StateContext } from '@/contexts/state'
import { accountStore } from '@/store/account'
import { useForm } from 'react-hook-form'
import Payment from './paypal'
import { toast } from 'react-toastify'

const IndexDetail = () => {
    const params = useParams()
    const { users } = accountStore()
    const { role, isLog } = use(StateContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { data: result, err }: { data: FilmDetailType[] | null, err: any } = useFetchDataByKey('film', 'getFilmDetail', params.id)
    const [data, setData] = useState<FilmDetailType[] | null>(null)
    const [showTicket, setShowTicket] = useState(false)
    const [urlBackground, setUrlBackground] = useState("")
    const [time, setTime] = useState(0);
    const [day, setDay] = useState('');
    const [seat, setSeat] = useState('')
    const [dateArray, setDateArray] = useState([]);
    const [isPaypal, setIsPaypal] = useState(false);
    const [price, setPrice] = useState(0)
    const [stateForm, setStateForm] = useState({
        name: '', email: '', phone: '', timeFrame: 0, created_at: '', date: '', count: 1,
        price: 0, idFilm: '', orderId: '', isConfirm: false
    })
    const keyDetail = ['director', 'cast', 'release', 'time']
    const inputValue = ['name', 'email', 'phone']
    useEffect(() => {
        const film: FilmDetailType[] | [] = result ?? []
        const currentDate = new Date();
        const releaseDate = new Date(film[0]?.release);
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const isWithinPurchaseRange = releaseDate.getTime() >= firstDayOfYear.getTime() && releaseDate.getTime() <= currentDate.getTime();
        setShowTicket(isWithinPurchaseRange)
        document.title = "Film Detail"
        result && setData(result)
        data && (document.title = data[0].title)
    }, [params, result, data])
    useEffect(() => {
        if (data) {
            const filmDetail: FilmDetailType[] = data;
            const currentDate = new Date();
            let tempDateArray = [];

            // Lấy ngày đặt vé từ ngày hiện tại đến 20 ngày sau
            for (let i = 0; i < 20; i++) {
                currentDate.setDate(currentDate.getDate() + 1);
                tempDateArray.push((new Date(currentDate)).toISOString().split("T")[0].split("-").reverse().join("/"));
            }

            setDateArray(tempDateArray as any);


            setUrlBackground(filmDetail[0].background)
        }
        users && setPrice(users.map(u => u.point).toString() === '20' ? 1 : 3)

    }, [data, users])
    const onSubmit = (value: any) => {
        if (time === 0) {
            toast.error('Please select a time frame!')
            return
        }
        if (day === '') {
            toast.error('Please select a date!')
            return
        }
        data && setStateForm({
            name: value.name, email: value.email, phone: value.phone, timeFrame: time,
            created_at: formatDate(new Date().toISOString().split("T")[0]), price: price,
            date: day, count: 1, idFilm: data[0].id, orderId: '', isConfirm: false
        })
        setIsPaypal(true)
    }
    return <div className="relative detailFilm w-full h-auto pt-10 ">
        <div className="fixed w-full h-full inset-0 z-0 bg-zinc-950 bg-opacity-60">
            <img src={urlBackground} className="w-full h-full object-cover  bg-zinc-950 bg-opacity-60" loading='lazy' alt={`fixed-${urlBackground}`} />
            <div className="overlay absolute w-full h-full top-0 left-0 bg-zinc-950 bg-opacity-60 z-0"></div>
        </div>
        <BreadcrumbItems props={{ title: data ? data.map(d => d.title) : ["Film detail"] }} />
        {data && data.map(d => <div className="relative w-full h-auto min-h-[300px] flex flex-wrap" key={d._id}>
            <div className="images relative w-full flex content-start justify-center h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
                <div className="background absolute w-[99.5%] h-4/5 z-0 rounded-lg border border-solid border-zinc-200 animateShowItems transition-all animate-delay-0 
                p-1">
                    <img src={d.background} className="w-full h-full rounded-lg object-cover animateShowItems" alt="" loading='lazy' />
                </div>
                <div className="absolute thumbnails w-[200px] h-[250px] rounded-lg bottom-0 border border-solid border-zinc-200 animateShowItems transition-all animate-delay-0" >
                    <img className="w-full h-full rounded-lg object-cover animateShowItems" src={d.thumbnails} alt="" loading='lazy' />
                </div>
            </div>
            <div className="filmInfo w-full h-auto flex flex-wrap justify-center items-center mt-5 animateOpacity transition-all animate-delay-0-1">
                <span className="font-sc-thin w-full h-auto text-center font-tech-shark text-7xl font-extrabold text-white my-6">{d.title}</span>
                <span className="font-sc-thin w-[90%] h-auto text-center text-[30px] font-extrabold mt-1 text-white bg-zinc-950 bg-opacity-60 p-5 rounded-md">{d.des}</span>
                <div className="infoFilm w-full h-auto flex flex-wrap justify-center">
                    {keyDetail.map((k: string) => <div key={k} className="item w-2/5 h-auto min-h-[50px] flex items-center bg-zinc-700 rounded-lg m-1 px-2">
                        <span className="font-bold text-[20px] text-white">
                            {k.toUpperCase()}: <span className="font-bold text-[20px]">{k === 'release' ? formatDate(d[k]) : d[k]}</span>
                        </span>

                    </div>)}

                </div>
                <span className="font-sc-thin w-full h-auto text-center text-[40px] font-extrabold text-red-600 mt-4">Trailer</span>
                <iframe
                    className="w-4/5 h-auto min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] 2xl:min-h-[800px] border border-solid rounded-lg border-zinc-100 mb-10"
                    src={`https://www.youtube.com/embed/${d.trailer.split('v=')[1]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {isLog && role === 2 && showTicket && <div className="frame w-full h-auto min-h-[400px] flex flex-wrap justify-center content-start">
                <h1 className="w-full text-center font-sc-thin font-extrabold text-[40px] text-red-600 my-4">Time frame</h1>
                <ButtonGroup size="lg">{d.frame.map(t => <Button key={`time-${t}`} className="transition-all"
                    onClick={() => { setTime(t) }} color={t === time ? 'primary' : 'default'} radius="sm">{t}:00 {t < 12 ? 'AM' : 'PM'}</Button>)}</ButtonGroup>
                <h1 className="w-full text-center font-sc-thin font-extrabold text-[40px] text-red-600 my-4">Date</h1>
                <div className="w-4/5 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
                    {dateArray.map(d => <Button key={`date-${d}`} className="transition-all" radius="sm" size="lg" onClick={() => { setDay(d) }} color={d === day ? 'primary' : 'default'}>{d}</Button>)}
                </div>
                {time !== 0 && day !== '' && <Seat props={{ seat, setSeat, time, day }} />}
                <h1 className="w-full text-center font-sc-thin font-extrabold text-[40px] text-red-600 my-4">Form</h1>
                <div className="form w-3/5 h-auto mb-8 flex flex-wrap justify-evenly z-10">
                    {users && users.map(u => inputValue.map((i: string) =>
                        <Input key={`input-${i}`} {...register(i, { required: true })} radius="sm" isInvalid={errors[i] ? true : false} type="text"
                            label={i.toUpperCase()} defaultValue={u[i]} className={`${i === 'email' ? 'w-2/5' : 'w-1/5'} mx-1`} />
                    ))}
                    <Input {...register('count', { required: true })} radius="sm" type="text" label="Ticket price" value={`${price}$`} className="w-[15%]" />
                    {!isPaypal && <div className="w-full flex items-center justify-center my-2">
                        <Button onClick={() => { handleSubmit(onSubmit)() }} color="success" size="lg" className="my-2 w-[180px] text-[20px] font-sc-thin text-white">Payment</Button>
                    </div>}
                    {isPaypal && <Payment props={{ setIsPaypal, setStateForm, stateForm, seat, count: 1, price, title: d.title, background: d.background, thumbnails: d.thumbnails }} />}
                </div>
            </div>}
        </div>)}
    </div>
}

export default IndexDetail