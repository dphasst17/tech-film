'use client'
import React from 'react'
import SlideShow from './slide'
import New from './new'

const HomeIndex = React.memo(() => {
    return (
        <div className='w-full h-auto min-h-screen '>
            <SlideShow />
            <New />
        </div>
    )
})

export default HomeIndex