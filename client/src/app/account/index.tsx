'use client'
import { StateContext } from '@/contexts/state'
import { userStore } from '@/store/user'
import { Button, Input, useDisclosure } from '@nextui-org/react'
import { TbUserEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import React, { use } from 'react'
import Title from '../../components/ui/title'
import UserTicket from './ticket'

const AccountIndex = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isLog } = use(StateContext)
    const { users } = userStore()
    return isLog && <div className='w-full h-full grid grid-cols-2 gap-2' >
        <div className='point h-[30px] col-span-2 my-4 px-2 flex items-center text-white'>
            POINT:
            <Button variant='bordered' className='h-[30px] text-white flex items-center justify-center mx-2' radius='sm' color='default'>{users && users[0].point} </Button>
        </div>
        <section className='info flex flex-wrap justify-center content-start'>
            <Title props={{ value: 'USER' }} />
            {users?.map(u => <div className='w-2/5'>
                <Input label="Full name" value={u.name} className='my-2' />
                <Input label="Phone" value={u.phone} className='my-2' />
                <Input label="Email" value={u.email} className='my-2' />
                <Button isIconOnly color='primary' radius='sm' className='mx-1' onPress={onOpen}><RiLockPasswordLine /></Button>
                <Button isIconOnly color='primary' radius='sm' className='mx-1' onPress={onOpen}><TbUserEdit /></Button>
            </div>)}
        </section>
        <UserTicket />
    </div >
}
export default AccountIndex