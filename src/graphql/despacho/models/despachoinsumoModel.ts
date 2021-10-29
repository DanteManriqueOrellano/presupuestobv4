import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { IBaseDespachoInsumoInterface } from "../interfaces/basedespachoinsumo.Interface";


//es el modelo hijo
@ObjectType()
@InputType()
@ArgsType()
export class DespachoInsumoModel extends IBaseDespachoInsumoInterface {
    //aca se colocaran otros modelos anidados que corresponda al modelo despacho
    
}