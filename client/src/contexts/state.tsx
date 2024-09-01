'use client'
import { StatisState } from "@/types/statis";
import { get } from "@/utils/cookie";
import { createContext, useEffect, useState } from "react";

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLog, setIsLog] = useState<boolean>(false)
    const [role, setRole] = useState<number>(2)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [timeFrame, setTimeFrame] = useState<number[]>([7, 9, 11, 13, 15, 17, 19, 21, 23])
    const [statis, setStatis] = useState<StatisState | null>(null)
    useEffect(() => {
        setIsLog(JSON.parse(get('filmlogs') || 'false'))
        setRole(Number(JSON.parse(get('f-role') || '2')))
    }, [])
    useEffect(() => {
        statis && console.log(statis)
    }, [statis])
    return (
        <StateContext.Provider value={{
            isLog, setIsLog,
            role, setRole,
            isLoading, setIsLoading,
            timeFrame, setTimeFrame,
            statis, setStatis
        }}>
            {children}
        </StateContext.Provider>
    )
}