'use client'

import { Skeleton } from "@nextui-org/react"

const Skeletons = () => {
    return <div className="w-4/5 h-[80px] flex items-center gap-3 my-2">
        <div className='h-full'>
            <Skeleton className="flex rounded-lg w-20 h-full" />
        </div>
        <div className="w-full h-full flex flex-col gap-2">
            <Skeleton className="h-2/4 w-3/5 rounded-lg" />
            <Skeleton className="h-2/4 w-4/5 rounded-lg" />
        </div>
    </div>
}
export default Skeletons