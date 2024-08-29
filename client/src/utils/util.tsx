'use client'
export const formatDate = (date: string) => {
    return date.split("-").reverse().join("/")
}
export const pagination = (limit: number, total: number) => {
    return Math.ceil(total / limit)
}