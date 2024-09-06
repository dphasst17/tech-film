'use client'
import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from "@nextui-org/react"
import { useFetchDataByKey } from '@/hooks/useFetchData'
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { getSeatDetail } from '@/api/ticket';
let socket: any;
const Seat = ({ props }: { props: any }) => {
    const key = { date: props.day, time: props.time.toString() }
    /* const { data, err: errSeat } = useFetchDataByKey('ticket', 'getSeatDetail', key); */
    const [seatData, setSeatData] = useState<string[]>([])
    const [seatFocus, setSeatFocus] = useState<string[]>([])
    const [userSelect, setUserSelect] = useState<string>("")
    const col = ['a', 'b', 'c', 'd', 'e', 'f']
    const row = [1, 2, 3, 4, 5, 6, 7]
    useEffect(() => {
        getSeatDetail(key).then(res => {
            if (res.status === 200) setSeatData(res.data)
        })
    }, [])
    useEffect(() => {
        // Kết nối đến server
        if (!socket) {

            socket = io(`${process.env.NEXT_PUBLIC_URL}`);
        }
        // Lắng nghe sự kiện 'seat-changed'
        socket.on('seat-changed', (newTicket: any) => {
            if (props.day === newTicket.date && props.time === newTicket.time) {
                setSeatData([...seatData, newTicket.seat])
            }
        });
        socket.on('seat-focus', (seatSocket: any) => {
            if (key.date === seatSocket.date && key.time.toString() === seatSocket.time && userSelect !== seatSocket.seat) {
                setSeatFocus([...seatFocus, seatSocket.seat])
            }
        })
        //post data to socket server
        socket.emit('seat-select', { seat: props.seat });
        return () => {
            socket.off('seat-changed');
            socket.off('seat-focus');
            socket.close();
            socket = null
        };
    }, [userSelect]);
    const handleSelectSeat = (col: string, row: number) => {
        const socket = io(`${process.env.NEXT_PUBLIC_URL}`);
        if (seatData?.includes(`${col.toLocaleUpperCase()}${row}`)) {
            toast.error('Seat has been sold')
            return false
        }
        if (seatFocus?.includes(`${col.toLocaleUpperCase()}${row}`)) {
            toast.error('Seat has been chosen by others')
            return false
        }
        setUserSelect(`${col.toLocaleUpperCase()}${row}`)
        props.setSeat(`${col.toLocaleUpperCase()}${row}`)
        socket.emit('seat-select', { date: props.day, time: props.time.toString(), seat: `${col.toLocaleUpperCase()}${row}` })
    }
    const colorBtn = (col: string, row: number) => {
        const data = `${col.toLocaleUpperCase()}${row}`
        const changed = seatData?.includes(data)
        const focus = seatFocus?.includes(data)
        const selected = props.seat === data
        return changed ? 'success' : focus ? 'primary' : (selected ? 'success' : 'default')
    }
    const tooltipContent = (col: string, row: number) => {
        const data = `${col.toLocaleUpperCase()}${row}`
        const changed = seatData?.includes(data)
        const focus = seatFocus?.includes(data)
        return changed ? 'Sold' : focus ? 'Chosen by others' : 'Has not been selected'
    }
    return <section className='seat w-full max-w-[1000px] min-w-[300px] h-[600px] flex flex-wrap justify-center bg-zinc-900 bg-opacity-70 p-2 rounded-lg mt-4'>
        <div className='w-full h-[8%] flex text-white bg-zinc-900 rounded-lg'>
            <div className='w-[10%] h-full flex items-center justify-center'>COLUMN</div>
            <div className='w-[90%] h-full flex items-center justify-center'>SEAT POSITION</div>
        </div>
        <div className='w-[10%] h-[92%] flex flex-col justify-around items-center'>
            {col.map(c => <div key={c} className='text-white'>{c.toLocaleUpperCase()}</div>)}
        </div>
        <div className='w-[90%] h-[92%] flex flex-col justify-around'>
            {col.map(c =>
                <div key={`seat-${c}`} className='w-full grid grid-cols-7 gap-2 lg:gap-6 xl:gap-10'>
                    {row.map(r =>
                        <Tooltip content={tooltipContent(c, r)} key={`${c}${r}`}>
                            <Button color={colorBtn(c, r)}
                                radius="sm"
                                className={`${seatData?.includes(`${c.toLocaleUpperCase()}${r}`) || seatFocus?.includes(`${c.toLocaleUpperCase()}${r}`) ? 'text-white' : 'text-black'}`}
                                onClick={() => handleSelectSeat(c, r)}>
                                {c.toLocaleUpperCase()}{r}
                            </Button>
                        </Tooltip>
                    )}
                </div>)}
        </div>
    </section>
}

export default Seat