'use client'
import { use, useEffect, useState } from "react";
import * as apiFilm from "@/api/film"
import * as apiUser from "@/api/user"
import * as apiAuth from "@/api/auth"
import * as apiTicket from "@/api/ticket"
import { StateContext } from "@/contexts/state";
const filmApi = apiFilm as Record<string, any>
const userApi = apiUser as Record<string, any>
const authApi = apiAuth as Record<string, any>
const ticketApi = apiTicket as Record<string, any>
const handleGetApi = (type: string, fName: string, key?: string | number | any[] | { [key: string]: string | number | boolean }) => {
    let url;
    switch (type) {
        case 'film':
            url = key ? filmApi[fName](key) : filmApi[fName]
            break;
        case 'user':
            url = key ? userApi[fName](key) : userApi[fName]
            break;
        case 'auth':
            url = key ? authApi[fName](key) : authApi[fName]
            break;
        case 'ticket':
            url = key ? ticketApi[fName](key) : ticketApi[fName]
        default:
            break;
    }
    return url
}
export const useFetchData = (type: string, fName: string) => {
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const { setIsLoading } = use(StateContext)
    useEffect(() => {
        let url = handleGetApi(type, fName)
        setIsLoading(true)
        url().then((res: any) => {
            setIsLoading(false)
            if (res.status === 200 || res.status === 201) {
                setData(res.data)
                return
            }
            throw Error(`Message: ${res.messages}`);
        })
            .catch((err: any) => {
                setErr(err)
            })
    }, [])
    return { data, err };
}
export const useFetchDataByKey = (type: string, fName: string, key: string | number | any[] | { [key: string]: string | number | boolean }) => {
    const { setIsLoading } = use(StateContext)
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    useEffect(() => {
        setIsLoading(true)
        let url = handleGetApi(type, fName, key)
        url.then((res: any) => {
            if (res.status === 200 || res.status === 201) {
                setData(res.data)
                return
            }
            throw Error(`Message: ${res.messages}`);
        })
            .catch((err: any) => {
                setErr(err)
            })
    }, []);
    return { data, err };
}