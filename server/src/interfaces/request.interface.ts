import { Request } from "express";

export interface RequestCustom extends Request {
    idUser: string
}

export interface Responses {
    status: number,
    message?: string,
    data?: ResponseData | ResponseData[]
}
export interface ResponseData {
    [key: string]: string | number | boolean | number[] | any
}