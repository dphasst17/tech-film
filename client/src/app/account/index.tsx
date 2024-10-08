'use client'
import { accountStore } from '@/store/account'
import { Button, Input, Modal, useDisclosure } from '@nextui-org/react'
import Title from '../../components/ui/title'
import UserTicket from './ticket'
import React, { useState } from 'react';
import ModalUserEdit from '@/components/modal/user.edit'
import ModalPassword from '@/components/modal/user.password'

const UserIndex = React.memo(() => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [modalName, setModalName] = useState<string>('')
    const { users } = accountStore()
    return users && <div className='w-full h-full grid grid-cols-2 gap-2' >
        <div className='point h-[30px] col-span-2 my-4 px-2 flex items-center text-white'>
            POINT:
            <Button variant='bordered' className='h-[30px] text-white flex items-center justify-center mx-2' radius='sm' color='default'>
                {users && users[0].point}
            </Button>
        </div>
        <section className='info flex flex-wrap justify-center content-start'>
            <Title title={'USER'} />
            {users && users.map(u => <div className='w-2/5' key={`key-${u.name}`}>
                <Input label="Full name" value={u.name} className='my-2' />
                <Input label="Phone" value={u.phone} className='my-2' />
                <Input label="Email" value={u.email} className='my-2' />
                <Button color='primary' radius='sm' className='mx-1' onClick={() => { setModalName('password'); onOpen() }}>Password</Button>
                <Button color='primary' radius='sm' className='mx-1' onClick={() => { setModalName('edit'); onOpen() }}>Edit</Button>
            </div>)}
        </section>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} aria-labelledby="modal-title" aria-describedby="modal-description">
            {modalName === 'password' ? <ModalPassword onClose={onClose} setModalName={setModalName} /> : <ModalUserEdit onClose={onClose} setModalName={setModalName} />}
        </Modal>
        <UserTicket />
    </div >
})
export default UserIndex