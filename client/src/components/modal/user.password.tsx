import { resetPassword } from '@/api/auth';
import { getToken } from '@/utils/cookie';
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface SubmitValue {
    current: string,
    password: string,
    confirm: string
}
const ModalPassword = ({ onClose, setModalName }: { onClose: () => void, setModalName: React.Dispatch<React.SetStateAction<string>> }) => {
    const { register, handleSubmit } = useForm()
    const [type, setType] = useState('password')
    const onSubmit: any = async (data: SubmitValue) => {
        if (data.password !== data.confirm) {
            toast.error('Password not match')
            return
        }
        const token = await getToken()
        token && resetPassword(token, { current: data.current, password: data.password })
            .then(res => {
                if (res.status !== 200) {
                    toast.error(res.message)
                } else {
                    toast.success('Change password success')
                    onClose()
                    setModalName('')
                }
            })
    }
    return <ModalContent>
        {() => <>
            <ModalHeader>Change password</ModalHeader>
            <ModalBody>
                <div className='w-full grid grid-cols-1 gap-y-4'>
                    <Input
                        label="Current password"
                        type={type}
                        radius='sm'
                        {...register('current')}
                    />
                    <Input
                        label="New password"
                        type={type}
                        radius='sm'
                        {...register('password')}
                    />
                    <Input
                        label="Confirm password"
                        type={type}
                        radius='sm'
                        {...register('confirm')}
                    />
                </div>
                <div className='w-2/4'>
                    <Button color='default' variant='faded' onClick={() => setType(type === 'password' ? 'text' : 'password')}>{type === 'password' ? 'Show' : 'Hide'}</Button>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' onPress={onClose}>close</Button>
                <Button color='primary' onClick={handleSubmit(onSubmit)}>Submit</Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default ModalPassword