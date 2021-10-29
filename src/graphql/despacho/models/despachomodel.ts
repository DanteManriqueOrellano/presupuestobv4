import { Collection, SubCollection, ISubCollection  } from "fireorm";
import { ArgsType, Field, ObjectType } from "type-graphql";
import { IBaseDespachoInterface } from "../interfaces/basedespacho.Interace";
import { BaseDespachoType } from "../types/basedespachotype";
import { DespachoInsumoModel } from "./despachoinsumoModel";

//extiende a la base despacho type
@ObjectType()
@Collection()
export class DespachoModel extends BaseDespachoType {
    @Field(type => [DespachoInsumoModel])
    despachoinsumo: DespachoInsumoModel[];
}