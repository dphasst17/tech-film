export const getFilms = async (page?: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film?page=${page || 1}`)
        .then(res => res.json())
}
export const getFilmDetail = async (id: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/detail/${id}`)
        .then(res => res.json())
}
export const getNewFilm = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/new`)
        .then(res => res.json())
}
export const createFilm = async (data: any/* FilmCreate */) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}
export const updateFilm = async (id: string, data: any/* FilmUpdate */) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const searchFilm = async (data: { key: string, page: string, limit: string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}/api/film/search/${data.key}?page=${data.page || 1}&&limit=${data.limit || 10}`)
        .then(res => res.json())
}