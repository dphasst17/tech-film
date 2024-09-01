'use client'
import { newToken } from "@/api/auth"
import Cookies from "js-cookie"
const save = (key: string, value: string, exp: number) => {
    return Cookies.set(key, value, {
        expires: new Date(exp * 1000),
        path: "/",
    })
}

const get = (key: string) => {
    return Cookies.get(key)
}
const remove = (key: string) => {
    return Cookies.remove(key, {
        path: "/",
    })
}
const getToken = async () => {
    const access = get('f-atk')
    const refresh = get('f-rtk')
    if (!access) {
        if (!refresh) {
            remove('filmlogs')
            return false
        }
        const response = await newToken(refresh)
        const res = await response.json()
        save('f-atk', res.data.access, res.data.expired_access)
        return res.data.access
    }
    return access
}
export { save, get, remove, getToken }