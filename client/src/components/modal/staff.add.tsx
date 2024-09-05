'use client'
import { addStaff } from '@/api/staff'
import { DataAuthCreate, DataInfoCreate } from '@/types/staff'
import { getToken } from '@/utils/cookie'
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const AddStaff = ({ onClose, setModalName }: { onClose: () => void, setModalName: React.Dispatch<React.SetStateAction<string>> }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [count, setCount] = useState<number[]>([1])
    const colStaff = ['username', 'name', 'email', 'password']
    const onSubmit = async (data: { [key: string]: string }) => {
        if (count.length === 0) {
            return
        }
        const dataAuth: DataAuthCreate[] = count.map((c: number) => ({
            idUser: data[`username-${c}`],
            username: data[`username-${c}`],
            password: data[`password-${c}`],
            role: 1
        }))
        const dataInfo: DataInfoCreate[] = count.map((c: number) => ({
            idUser: data[`username-${c}`],
            name: data[`name-${c}`],
            email: data[`email-${c}`],
            phone: '',
            point: 0,
            action: 'active',
            created_at: new Date().toISOString().split("T")[0]
        }))
        const token = await getToken()
        token && addStaff(token, { dataAuth, dataInfo })
            .then(res => {
                if (res.status !== 201) {
                    toast.error(res.message)
                    return
                }
                toast.success("Add new staff success")
                setCount([])
                setModalName('')
                onClose()
            })

    }
    return <ModalContent>
        {(__onClose) => <>
            <ModalHeader>Add new staff</ModalHeader>
            <ModalBody className='w-full'>
                <Button
                    color='primary'
                    size='sm'
                    onClick={() => setCount([...count, count.length + 1])}
                    className='w-[100px]'
                >
                    Add
                </Button>
                <div className='grid grid-cols-2 gap-2 h-[400px] overflow-y-auto'>
                    {
                        count.map((c: number) => <div className={`item-${c}`}>
                            <div className='w-full grid grid-cols-2 mb-4 items-center justify-between'>
                                <span className='col-span-1'>#Staff {c}</span>
                                <div className='flex justify-end pr-6'>
                                    <Button size='sm' radius='sm' color='danger'
                                        onClick={() => setCount(count.filter((item) => item !== c))}
                                        className='max-w-[80px] col-span-1'>
                                        delete
                                    </Button>
                                </div>
                            </div>
                            {colStaff.map((item) => <Input
                                key={`input-${item}-${c}`}
                                {...register(`${item}-${c}`, { required: true })}
                                color='default'
                                size='md'
                                radius='sm'
                                className={`mb-4 ${errors[`${item}-${c}`] ? 'border-red-500 border border-solid' : ''} `}
                                label={item} />)}
                        </div>)
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' onClick={() => { setModalName(''); __onClose() }}>close</Button>
                <Button color='primary' onClick={handleSubmit(onSubmit)}>Add</Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default AddStaff