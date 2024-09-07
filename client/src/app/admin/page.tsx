'use client'
import React from 'react'
import Statis from './statis'
import FilmAdmin from './film'
import ListBtn from './list_btn'
import { Tab, Tabs } from '@nextui-org/react'
import Customer from './customer'

const Admin = () => {
    const [selected, setSelected] = React.useState<React.Key>('film')
    return <div>
        <Statis />
        <ListBtn />
        <div className='tabs w-[90%] h-auto mx-auto'>
            <Tabs
                size="md"
                variant='bordered'
                aria-label="Tabs form"
                selectedKey={selected as string}
                onSelectionChange={setSelected}
            >
                <Tab key="film" title="Film">
                </Tab>
                <Tab key="customer" title="Customer">
                </Tab>
            </Tabs>
        </div>
        {selected === 'film' && <FilmAdmin />}
        {selected === 'customer' && <Customer />}
    </div>
}

export default Admin