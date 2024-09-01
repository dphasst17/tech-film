'use client'
import { StateContext } from '@/contexts/state'
import React, { use } from 'react'

const Statis = () => {
    const { statis } = use(StateContext)
    return <div className='h-auto min-h-[10vh] grid grid-cols-5'>
        <div className='feature col-span-2 h-[80px] rounded-md'></div>
    </div>
}

export default Statis