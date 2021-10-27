import { Field, ID, Int, InterfaceType } from "type-graphql";

@InterfaceType()
export class BaseDespacho_Insumo {
    @Field(type => ID)
    id: string;
    @Field()
    insumo: string;
    @Field()
    u_medida: string;
    @Field(type => Int)
    cantidad: number;

}