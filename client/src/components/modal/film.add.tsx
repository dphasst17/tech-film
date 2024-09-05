'use client'
import { createFilm } from '@/api/film'
import { StateContext } from '@/contexts/state'
import { filmStore } from '@/store/film'
import { Film, FilmDetailType } from '@/types/film'
import { getToken } from '@/utils/cookie'
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface DataValue {
    id: string
    title: string
    director: string
    cast: string
    des: string
    release: string
    time: string
    background: string
    thumbnails: string
    trailer: string
}
export interface DataInsert extends DataValue {
    frame: number[] | []
}

const AddFilm = ({ onClose, setModalName }: { onClose: () => void, setModalName: React.Dispatch<React.SetStateAction<string>> }) => {
    const { timeFrame } = use(StateContext)
    const { films, setFilms } = filmStore()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [time, setTime] = useState<number[] | []>([])
    const ColFilm = [
        { wFull: false, type: Input, key: 'id' },
        { wFull: false, type: Input, key: 'title' },
        { wFull: true, type: Input, key: 'director' },
        { wFull: true, type: Textarea, key: 'cast' },
        { wFull: true, type: Textarea, key: 'des' },
        { wFull: false, type: Input, key: 'release' },
        { wFull: false, type: Input, key: 'time' },
        { wFull: false, type: Input, key: 'background' },
        { wFull: false, type: Input, key: 'thumbnails' },
        { wFull: true, type: Input, key: 'trailer' }
    ]
    const onSubmit: any = async (data: DataValue) => {
        if (time.length === 0) {
            toast.error('Please select time frame')
            return
        }
        const dataInsert: DataInsert = {
            ...data,
            title: (data.title.toString()).toUpperCase(),
            frame: time.length !== 0 ? time : [0],
        }
        const token = await getToken()
        token && createFilm(token, dataInsert)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Add new film success')
                    films && setFilms({ ...films, detail: [res.data, ...films.detail] })
                    setModalName('')
                    onClose()
                } else {
                    toast.error(res.message)
                }
            })
    }
    const handleCheckbox = (t: number) => {
        const getTime = time.filter((e: number) => e === t)
        getTime.length ? setTime(time.filter(e => e !== t)) : setTime([...time, t])
    }
    return <ModalContent>
        {(__onClose) => <>
            <ModalHeader>Add new film</ModalHeader>
            <ModalBody className='max-h-[500px] xl:max-h-[1000px] flex flex-wrap !flex-row justify-around overflow-y-auto'>
                {ColFilm.map(e => <e.type key={e.key}
                    className={`${!e.wFull ? 'w-[48%]' : 'w-full'}`}
                    type={e.key === 'release' ? 'date' : 'text'}
                    variant="bordered"
                    label={e.key.toUpperCase()} isInvalid={errors[e.key] ? true : false}
                    {...register(`${e.key}`, { required: true })} />)}
                <span className="w-full">Time frame</span>
                <div className='timeFrame w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {timeFrame.map((t: number) => (
                        <Checkbox key={t} onClick={() => { handleCheckbox(t) }} color="primary">
                            {t}:00
                        </Checkbox>
                    ))}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' onClick={() => { setModalName(''); __onClose() }}>close</Button>
                <Button color='primary' onClick={handleSubmit(onSubmit)}>Create</Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default AddFilm