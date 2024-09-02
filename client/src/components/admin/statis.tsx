'use client'
import React from 'react'

const StatisComponent = ({ title, value, Icon }: { title: string, value: string, Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element }) => {
    return <div className={`h-full min-h-[145px] col-span-1 
     text-white bg-zinc-900 bg-opacity-60 rounded-md flex flex-wrap contents-start justify-evenly p-2`}
    >
        <div className="w-3/4 flex flex-col justify-around items-center">
            <h1 className="text-[30px] font-bold font-mono">{value}</h1>

            <h2 className={`text-[25px] font-bold font-mono`}>{title}</h2>
        </div>
        <div className="w-1/4 h-full flex justify-center items-center">
            <Icon />
        </div>
    </div>
}

export default StatisComponent