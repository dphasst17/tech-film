import { updateUser } from '@/api/user'
import { accountStore } from '@/store/account'
import { getToken } from '@/utils/cookie'
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface SubmitValue {
    name: string,
    phone: string,
    email: string
}

const ModalUserEdit = ({ onClose, setModalName }: { onClose: () => void, setModalName: React.Dispatch<React.SetStateAction<string>> }) => {
    const { users, setUsers } = accountStore()
    const { register, handleSubmit } = useForm()
    const onSubmit: any = async (data: SubmitValue) => {
        const changedKeys = (Object.keys(data) as (keyof SubmitValue)[]).filter((key: keyof SubmitValue) => {
            const userKey = key;
            return users && users[0][userKey] !== data[key];
        });
        const detailData = changedKeys.reduce((acc, key) => {
            return { ...acc, [key]: data[key] };
        }, {});
        const token = await getToken()
        token && updateUser(token, detailData)
            .then(res => {
                if (res.status !== 200) {
                    toast.error(res.message)
                } else {
                    toast.success(res.message)
                    users && setUsers([{ ...users[0], ...detailData }])
                    onClose()
                    setModalName('')
                }
            })
    }
    return <ModalContent>
        {() => <>
            <ModalHeader>Edit user</ModalHeader>
            <ModalBody>
                <div className='w-full grid grid-cols-1 gap-y-4'>
                    <Input
                        label="Full name"
                        {...register('name', { required: true })}
                        defaultValue={users ? users[0].name : ''}
                        className='my-2'
                    />
                    <Input
                        label="Phone"
                        {...register('phone', { required: true })}
                        defaultValue={users ? users[0].phone : ''}
                        className='my-2'
                    />
                    <Input
                        label="Email"
                        {...register('email', { required: true })}
                        defaultValue={users ? users[0].email : ''}
                        className='my-2'
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' onPress={onClose}>close</Button>
                <Button color='primary' onClick={handleSubmit(onSubmit)}>Update</Button>
            </ModalFooter>
        </>
        }
    </ModalContent >
}

export default ModalUserEdit