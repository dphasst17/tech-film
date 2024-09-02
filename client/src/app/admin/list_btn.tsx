import { Button } from '@nextui-org/react'
import React from 'react'

const ListBtn = () => {
    return <div className='w-[90%] h-[100px] mx-auto flex justify-start items-center'>
        <Button color='primary' size="sm" className='mx-2'>
            <span className='text-white'>Add new film</span>
        </Button>
        <Button color='primary' size="sm" className='mx-2'>
            <span className='text-white'>Add new user</span>
        </Button>
    </div >
}

export default ListBtn