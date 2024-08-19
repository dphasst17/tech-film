import { ObjectId } from "mongoose";

export interface FilmType {
    _id: ObjectId;
    title: string;
    background: string;
    thumbnails: string;
}
export interface FilmDetail extends FilmType {
    director: string;
    cast: string;
    des: string;
    release: string;
    time: string;
    trailer: string;
    frame: Array<number>;
    [key: string]: string | number | any[] | any
}
export interface FilmCreate extends FilmType {
    director: string;
    cast: string;
    des: string;
    release: string;
    time: string;
    trailer: string;
    frame: Array<number>;
    [key: string]: string | number | any[] | any
}
export interface FilmResponse extends FilmType {
    director: string;
    cast: string;
    des: string;
    release: string;
    time: string;
    trailer: string;
    frame: Array<number>;
    [key: string]: string | number | any[] | any
}