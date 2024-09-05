'use client'
import AddFilm from '@/components/modal/film.add'
import AddStaff from '@/components/modal/staff.add'
import { Button, Modal, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'

const ListBtn = () => {
    const [modalName, setModalName] = useState<string>('')
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return <div className='w-[90%] h-[100px] mx-auto flex justify-start items-center'>
        <Button color='primary' size="sm" className='mx-2' onClick={() => { setModalName('film'); onOpen() }}>
            <span className='text-white'>Add new film</span>
        </Button>
        <Button color='primary' size="sm" className='mx-2' onClick={() => { setModalName('staff'); onOpen() }}>
            <span className='text-white'>Add new staff</span>
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} aria-labelledby="modal-title" aria-describedby="modal-description" size="3xl">
            {modalName === 'film' ? <AddFilm onClose={onClose} setModalName={setModalName} /> : <AddStaff onClose={onClose} setModalName={setModalName} />}
        </Modal>
    </div >
}

export default ListBtn