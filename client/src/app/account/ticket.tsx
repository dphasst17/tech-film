'use client'
import { userStore } from '@/store/user'
import { Code, Image, Pagination } from '@nextui-org/react'
import React, { useState } from 'react'
import Title from '../../components/ui/title'
import Skeletons from '@/components/ui/skeletons'
import { pagination } from '@/utils/util'

const UserTicket = () => {
    const { ticket } = userStore()
    const [activePage, setActivePage] = useState<number>(1)
    return <section className='ticket h-auto min-h-[300px] flex flex-wrap justify-center'>
        <Title props={{ value: 'PURCHASED TICKET' }} />
        <div className='items w-full h-auto flex flex-wrap justify-center'>
            {!ticket && <><Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons /></>}
            <div className='ticket w-3/5 h-auto min-h-[650px] flex flex-wrap justify-center'>
                {ticket?.slice((3 * activePage) - 3, 3 * activePage).map(t => <div style={{ backgroundImage: `url(${t.background})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 120%' }} className='ticketDetail w-full h-[180px] flex flex-wrap my-1 rounded-lg' key={t.idTicket}>
                    <div className='images w-1/5 h-full flex items-center justify-center'>
                        <Image src={t.thumbnails} className='w-full h-full max-h-[190px] object-cover' />
                    </div>
                    <div className="contentTicket w-4/5 h-full flex flex-wrap justify-around py-1">
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
                ticket && <Pagination
                    className="w-full flex items-center justify-center my-2 animateOpacity transition-all cursor-pointer animate-delay-0-3"
                    isCompact size="lg" showControls total={pagination(3, ticket.length)} initialPage={1}
                    onChange={(e) => { setActivePage(e) }}
                />
            }
        </div >
    </section >
}

export default UserTicket