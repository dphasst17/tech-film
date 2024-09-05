'use client'
import { accountStore } from '@/store/account'
import { Code, Image, Pagination } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Title from '../../components/ui/title'
import Skeletons from '@/components/ui/skeletons'
import { getToken } from '@/utils/cookie'
import { getTicketByUser } from '@/api/ticket'
import { TicketByUser } from '@/types/ticket'

const UserTicket = React.memo(() => {
    const { ticket } = accountStore()
    const [data, setData] = useState<TicketByUser[] | null>(null)
    const [activePage, setActivePage] = useState<number>(1)
    useEffect(() => {
        ticket && setData(ticket.data)
    }, [ticket])
    const handleChangePage = async (page: number) => {
        const token = await getToken()
        setActivePage(page)
        if (page === 1) {
            ticket && setData(ticket.data)
            return
        }
        token && getTicketByUser(token, page.toString(), '3')
            .then(res => {
                if (res.status === 200) setData(res.data.data)
            })

    }
    return <section className='ticket h-auto min-h-[300px] flex flex-wrap justify-center'>
        <Title title={'PURCHASED TICKET'} />
        <div className='items w-full h-auto flex flex-wrap justify-center'>
            {!data && <><Skeletons />
                <Skeletons />
                <Skeletons />
            </>}
            <div className='ticket w-3/5 h-auto min-h-[650px] flex flex-wrap justify-center'>
                {data && data.map((t: TicketByUser) => <div
                    className='ticketDetail relative w-full h-[180px] flex flex-wrap my-1 rounded-lg' key={t.idTicket}>
                    <div className="overlay absolute w-full h-full top-0 left-0 z-0 bg-zinc-950 bg-opacity-65 rounded-lg">
                        <img src={t.background} className='w-full h-full object-cover rounded-lg' alt={`background-${t.title}`} loading='lazy' />
                    </div>
                    <div className='images w-1/5 h-full flex items-center justify-center z-10'>
                        <Image src={t.thumbnails} className='w-full h-full max-h-[190px] object-cover' alt={`thumbnail-${t.title}`} loading='lazy' />
                    </div>
                    <div className="contentTicket w-4/5 h-full flex flex-wrap justify-around py-1 z-10">
                        <Code className='w-[95%] text-center flex justify-center items-center cursor-pointer font-bold text-white text-[20px] bg-zinc-900 bg-opacity-80 truncate'>#{t.idFilm}</Code>
                        <Code className='w-[95%] text-center flex justify-center items-center cursor-pointer font-bold text-white text-[25px] bg-zinc-900 bg-opacity-80 truncate' size='lg' color='default'>{t.title}</Code>
                        <Code className='w-[95%] text-center flex justify-center items-center cursor-pointer font-bold text-white text-[20px] bg-zinc-900 bg-opacity-80 truncate'>Ticket id : {t.idTicket}</Code>
                        <Code className='w-[30%] text-center cursor-pointer font-bold text-white text-[20px] bg-zinc-900 bg-opacity-80 truncate'>{t.timeFrame}:00 {t.timeFrame < 12 ? 'AM' : 'PM'}</Code>
                        <Code className='w-2/5 text-center cursor-pointer font-bold text-white text-[20px] bg-zinc-900 bg-opacity-80 truncate'>{t.date}</Code>
                        <Code className='w-1/4 text-center cursor-pointer font-bold text-white text-[20px] bg-zinc-900 bg-opacity-80 truncate'>${t.price}</Code>
                    </div>
                </div>)}
            </div>
            {
                ticket && data && <Pagination
                    className="w-full flex items-center justify-center my-2 animateOpacity transition-all cursor-pointer animate-delay-0-3"
                    page={activePage}
                    isCompact size="lg" showControls total={ticket.totalPage} initialPage={1}
                    onChange={(e) => handleChangePage(e)}
                />
            }
        </div >
    </section >
})

export default UserTicket