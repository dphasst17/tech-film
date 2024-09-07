'use client'
import { DateIcon } from '@/components/icon/date'
import { customerStore } from '@/store/customer'
import { CustomerDetail } from '@/types/customer'
import { Avatar, Chip } from '@nextui-org/react'
import React from 'react'

const Customer = () => {
    const { staff, user } = customerStore()
    return <div className='w-4/5 h-auto grid grid-cols-2 gap-x-6 mx-auto pt-4'>
        <div className='staff grid grid-cols-2 gap-y-2 gap-x-4'>
            {
                staff && staff.detail.map((s: CustomerDetail) => <div key={s._id} className="rounded-md bg-zinc-50 h-[150px] grid grid-cols-3 shadow-md cursor-pointer hover:scale-105 transition-all">
                    <div className="avatar h-full flex flex-wrap content-center items-center justify-center col-span-1">
                        <Avatar className="" src={""} size="lg" radius="sm" color="primary" />
                        <p className="w-full text-center text-zinc-950 font-bold">#{s.idUser}</p>
                    </div>
                    <div className="relative detail h-full col-span-2 text-zinc-950 flex flex-col justify-start items-start py-1">
                        <div className="w-full flex justify-end px-1">
                            <Chip radius="sm" variant="bordered" color={s.action === "active" ? "success" : "danger"}>{s.action}</Chip>
                        </div>
                        <p className="font-bold">{s.name}</p>
                        <p className="text-zinc-700">{s.email}</p>
                        <p className="text-zinc-700">{s.phone ? s.phone : "N/A"}</p>
                        <p className="text-zinc-700 flex">
                            <DateIcon className="mr-2 text-[20px]" />
                            {s.created_at!.split("T")[0].split("-").reverse().join("/")}</p>
                    </div>
                </div>)
            }
        </div>
        <div className='user grid grid-cols-2 gap-y-2 gap-x-4'>
            {
                user && user.detail.map((s: CustomerDetail) => <div key={s._id} className="rounded-md bg-zinc-50 h-[150px] grid grid-cols-3 shadow-md cursor-pointer hover:scale-105 transition-all">
                    <div className="avatar h-full flex flex-wrap content-center items-center justify-center col-span-1">
                        <Avatar className="" src={""} size="lg" radius="sm" color="primary" />
                        <p className="text-zinc-950 font-bold">#{s.idUser}</p>
                    </div>
                    <div className="relative detail h-full col-span-2 text-zinc-950 flex flex-col justify-start items-start py-1">
                        <div className="w-full flex justify-end px-1">
                            <Chip radius="sm" variant="bordered" color={s.action === "active" ? "success" : "danger"}>{s.action}</Chip>
                        </div>
                        <p className="font-bold">{s.name}</p>
                        <p className="text-zinc-700">{s.email}</p>
                        <p className="text-zinc-700">{s.phone ? s.phone : "N/A"}</p>
                        <p className="text-zinc-700 flex">
                            <DateIcon className="mr-2 text-[20px]" />
                            {s.created_at!.split("T")[0].split("-").reverse().join("/")}</p>
                    </div>
                </div>)
            }
        </div>
    </div>
}

export default Customer