'use client'
import { updateFilm } from '@/api/film'
import { StateContext } from '@/contexts/state'
import { useFetchDataByKey } from '@/hooks/useFetchData'
import { FilmDetailType } from '@/types/film'
import { getToken } from '@/utils/cookie'
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const EditFilm = ({ idFilm, onClose }: { idFilm: string, onClose: () => void }) => {
    const { data: result, err }: { data: FilmDetailType[] | null, err: any } = useFetchDataByKey('film', 'getFilmDetail', idFilm)
    const { timeFrame } = use(StateContext)
    const [data, setData] = useState<FilmDetailType | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [time, setTime] = useState<number[]>([])
    useEffect(() => {
        if (result) {
            const apiData = result as FilmDetailType
            result && setData(result)
            apiData && setTime(apiData.flatMap((d: FilmDetailType) => d.frame))
        }
    }, [result])
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
    const handleCheckbox = (t: number) => {
        const getTime = time.filter((e: number) => e === t)
        getTime.length ? setTime(time.filter(e => e !== t)) : setTime([...time, t])
    }
    const onSubmit: any = async (value: FilmDetailType) => {
        const dataFrame: number[] = data && data.flatMap((d: FilmDetailType) => d.frame)
        const changedKeys = (Object.keys(value) as (keyof FilmDetailType)[]).filter((key: keyof FilmDetailType) => {
            const filmKey = key;
            return data && data[0][filmKey] !== value[key];
        });

        const isChangeFrame = dataFrame.length !== time.length
            ? true
            : dataFrame.every((d: number) => time.includes(d));
        if (time.length === 0) {
            toast.error('Please select time frame')
            return
        }
        if (!changedKeys && !isChangeFrame) {
            onClose()
            return
        }
        const detailData: any = data && changedKeys.reduce((acc, key) => {
            return { ...acc, [key]: value[key] };
        }, {});
        isChangeFrame && (detailData.frame = time)
        const token = await getToken()
        token && updateFilm(token, idFilm, detailData)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Edit film success')
                    onClose()
                } else {
                    toast.error(res.message)
                }
            })
    }
    return <ModalContent>
        {(__onClose) => <>
            <ModalHeader>Edit film</ModalHeader>
            <ModalBody className='max-h-[500px] xl:max-h-[1000px] overflow-y-auto'>
                {data && data.map((d: FilmDetailType) => <div className='max-h-[500px] xl:max-h-[1000px] flex flex-wrap !flex-row justify-between overflow-y-auto' key={d.id}>
                    {ColFilm.map(e => <e.type key={e.key}
                        className={`${!e.wFull ? 'w-[49%]' : 'w-full'} my-1`}
                        type={e.key === 'release' ? 'date' : 'text'}
                        variant="bordered"
                        defaultValue={d[e.key as keyof FilmDetailType]}
                        label={e.key.toUpperCase()} isInvalid={errors[e.key] ? true : false}
                        {...register(`${e.key}`, { required: true })} />)}
                    <span className="w-full">Time frame</span>
                    <div className='timeFrame w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
                        {timeFrame.map((t: number) => (
                            <Checkbox key={t} onClick={() => { handleCheckbox(t) }} defaultSelected={time.filter((e: number) => e === t).length ? true : false} color="primary">
                                {t}:00
                            </Checkbox>
                        ))}
                    </div>
                </div>)}
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleSubmit(onSubmit)}>Update</Button>
                <Button color='danger' onPress={__onClose}>close</Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default EditFilm