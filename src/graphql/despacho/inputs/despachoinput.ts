import { ISubCollection, SubCollection } from "fireorm";
import { ArgsType, Field, ID, InputType } from "type-graphql";







@ArgsType()
@InputType()
export class DespachoInput {
    @Field(type => ID)
    id: string
    @Field()
    nroDespacho: string;
    @Field()
    nroRequerimiento: string;
    @Field()
    fechaPedido: string;
    @Field()
    fechaDespacho: string

   
}