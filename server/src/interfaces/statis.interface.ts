import { Film } from "src/schemas/film.schema"

export interface StatisFilm {
    total: number
    new: number
    top: Film[]
}

export interface StatisUser {
    total: number
    new: number

}
