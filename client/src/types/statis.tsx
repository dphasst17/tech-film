import { FilmDetailType } from "./film"

export interface StatisState {
    film: {
        top: FilmDetailType[],
        total: number,
        new: number
    }
    user: {
        total: number,
        new: number
    }
}