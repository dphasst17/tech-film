'use client'
import { updateStatusSeat } from '@/api/ticket';
import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader';
import { toast } from 'react-toastify';

const QRPage = () => {
    const [isScan, setIsScan] = useState<boolean>(false)
    const [data, setData] = useState('');
    useEffect(() => {
        data && setIsScan(false)
        data && updateStatusSeat(data, { isConfirm: true })
            .then(res => {
                if (res.status === 500) toast.error("Something went wrong")
                if (res.status === 404) toast.error(res.message)
                if (res.status === 200) {
                    toast.success(res.message)
                    setData("")
                }
            })
    }, [data])
    return <div className='w-full h-auto max-h-screen m-auto overflow-hidden pt-2 flex flex-col items-center'>
        <Button onClick={() => setIsScan(!isScan)} size='sm' color="primary" className='my-4 mx-auto'>{isScan ? 'Stop' : 'Start'} Scanning</Button>
        {isScan && <QrReader
            onScan={(e: any) => e !== "null" && setData(e)}
            onError={(e: any) => console.log(e)}
            delay={1000}
            facingMode={'user'}
            style={{ width: '500px', height: '500px', margin: 'auto' }}
        />}
    </div>
}

export default QRPage