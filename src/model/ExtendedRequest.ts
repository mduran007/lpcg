import { Request } from "express"
import { Usuario } from "./Usuario"

export interface ExtendedRequest extends Request {
    user: Usuario,

}
