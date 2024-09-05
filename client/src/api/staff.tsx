import { DataAuthCreate, DataInfoCreate } from "@/types/staff"

export const addStaff = async (token: string, data: { dataAuth: DataAuthCreate[], dataInfo: DataInfoCreate[] }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/staff`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

export const getStaff = async (token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/staff`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const getStaffDetail = async (token: string, id: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/staff/detail/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}