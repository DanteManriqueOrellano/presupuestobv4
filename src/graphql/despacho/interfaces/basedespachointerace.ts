import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class IBaseDespachoInterface {
    @Field()
    id: string;
    @Field()
    nroDespacho: string;
    @Field()
    nroRequerimiento: string;
    @Field()
    fechaPedido: string;
    @Field()
    fechaDespacho: string
}
