export const statisFilm = async (token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/statis/film`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}

export const statisUser = async (token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/statis/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}