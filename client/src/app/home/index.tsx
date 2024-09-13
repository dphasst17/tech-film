'use client'
import React from 'react'
import SlideShow from './slide'
import New from './new'
import Showing from './showing'

const HomePage = React.memo(() => {
    return (
        <div className='w-full h-auto min-h-screen '>
            <SlideShow />
            <New />
            <Showing />
        </div>
    )
})

export default HomePage