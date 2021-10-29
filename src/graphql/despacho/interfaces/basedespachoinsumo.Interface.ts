import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql";

//es el modelo hijo
@ObjectType('despachoinsumotype')
@InputType()
@ArgsType()
export abstract class IBaseDespachoInsumoInterface {
    @Field(type => ID)
    id: string;
    @Field()
    insumo: string;
    @Field()
    umedida: string;
    @Field(type => Int)
    cantidad: number;
}