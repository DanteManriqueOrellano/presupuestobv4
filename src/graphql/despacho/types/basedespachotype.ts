import { ObjectType } from "type-graphql";
import { IBaseDespachoInterface } from "../interfaces/basedespacho.Interace";

@ObjectType({ implements: IBaseDespachoInterface})
export class BaseDespachoType implements IBaseDespachoInterface {
    id: string;
    fechaDespacho: string;
    fechaPedido: string;
    nroDespacho: string;
    nroRequerimiento: string
}