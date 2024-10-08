'use client'
import React from 'react'
import Header from './header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Widget from '@/components/ui/widget';
const LayoutPage = ({ children }: { children: React.ReactNode }) => {
    return <div className='w-full h-auto min-h-screen'>
        <ToastContainer />
        <Header />
        <main className='w-full h-auto min-h-[93vh] bg-zinc-800 pt-2 overflow-y-auto'>
            {children}
        </main>
        <Widget />
    </div>
}

export default LayoutPage