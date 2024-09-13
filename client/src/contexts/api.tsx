'use client'
import { useFetchData } from "@/hooks/useFetchData";
import { filmStore } from "@/store/film";
import { createContext, use, useEffect } from "react";
import { StateContext } from "./state";
import { getToken } from "@/utils/cookie";
import { getAllUser, getUserData } from "@/api/user";
import { accountStore } from "@/store/account";
import { getTicketByUser } from "@/api/ticket";
import { statisFilm, statisUser } from "@/api/statis";
import { StatisState } from "@/types/statis";
import { staffGetAll } from "@/api/staff";
import { customerStore } from "@/store/customer";

export const ApiContext = createContext<any>({});
export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLog, role, setStatis } = use(StateContext)
    const { setUsers, setTicket } = accountStore()
    const { setStaff, setUser } = customerStore()
    const { setFilms, setNewFilm, setShowing } = filmStore()
    const { data: dataNewFilm } = useFetchData('film', 'getNewFilm')
    const { data: dataFilms } = useFetchData('film', 'getFilms')
    const { data: dataShowing } = useFetchData('film', 'getShowingFilm')
    useEffect(() => {
        dataNewFilm && setNewFilm(dataNewFilm)
        dataFilms && setFilms(dataFilms)
        dataShowing && setShowing(dataShowing)
    }, [dataNewFilm, dataFilms, dataShowing, setNewFilm, setFilms, setShowing])
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
                        }),
                    role !== 2 && (
                        statisUser(token)
                            .then(res => {
                                if (res.status === 200) {
                                    setStatis((prev: StatisState) => ({ ...prev, user: res.data }))
                                }
                            }),
                        statisFilm(token)
                            .then(res => {
                                if (res.status === 200) {
                                    setStatis((prev: StatisState) => ({ ...prev, film: res.data }))
                                }
                            })
                    ),
                    role === 0 && (
                        staffGetAll(token)
                            .then(res => {
                                if (res.status === 200) {
                                    setStaff(res.data)
                                }
                            }),
                        getAllUser(token)
                            .then(res => {
                                if (res.status === 200) {
                                    setUser(res.data)
                                }
                            })
                    )
                )

            }
            fetchData()
        }

    }, [isLog, role, setUsers, setTicket])
    return (
        <ApiContext.Provider value={{}}>
            {children}
        </ApiContext.Provider>
    )
}