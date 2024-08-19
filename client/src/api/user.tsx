export const getUserData = async (token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const updateUser = async (token: string, data: { [x: string]: string | number | boolean | number[] }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}
export const getAllUser = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/all`)
        .then(res => res.json())
}