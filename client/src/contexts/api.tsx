'use client'
import { useFetchData } from "@/hooks/useFetch";
import { filmStore } from "@/store/film";
import { createContext, use, useEffect } from "react";
import { StateContext } from "./state";
import { getToken } from "@/utils/cookie";
import { getUserData } from "@/api/user";
import { userStore } from "@/store/user";
import { getTicketByUser } from "@/api/ticket";

export const ApiContext = createContext<any>({});
export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLog, role } = use(StateContext)
    const { setUsers, setTicket } = userStore()
    const { setFilms, setNewFilm } = filmStore()
    const { data: dataNewFilm, err: errNewFilm } = useFetchData('film', 'getNewFilm')
    const { data: dataFilms, err: errFilms } = useFetchData('film', 'getFilms')
    useEffect(() => {
        dataNewFilm && setNewFilm(dataNewFilm)
        dataFilms && setFilms(dataFilms)
    }, [dataNewFilm, dataFilms])
    useEffect(() => {
        if (isLog) {
            const fetchData = async () => {
                const token = await getToken()
                token && (
                    getUserData(token)
                        .then(res => {
                            if (res.status === 200) {
                                setUsers(res.data)
                            }
                        }),
                    role === 2 && getTicketByUser(token)
                        .then(res => {
                            if (res.status === 200) {
                                setTicket(res.data)
                            }
                        })
                )
            }
            fetchData()
        }

    }, [isLog, role])
    return (
        <ApiContext.Provider value={{}}>
            {children}
        </ApiContext.Provider>
    )
}