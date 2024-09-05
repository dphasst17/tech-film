export interface Film {
    _id?: string,
    id: string,
    title: string,
    background: string,
    thumbnails: string,
}

export interface FilmDetailType extends Film {
    des: string,
    release: string,
    time: string,
    trailer: string,
    frame: Array<number>,
    director: string,
    cast: string,
    [key: string]: any
}
export interface FilmAll {
    total: number,
    totalPage: number,
    limit: number
    page: number
    detail: FilmDetailType[]
}
