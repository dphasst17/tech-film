'use client'
import { Card } from '@nextui-org/react'

const CustomCard = () => {
    return <Card className="h-[500px] bg-zinc-500 space-y-5 p-4">
        <div className="h-full rounded-lg bg-zinc-600"></div>
        <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </div>
    </Card>
}

export default CustomCard