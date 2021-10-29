import { Arg, Args, ArgsType, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { IDespachoContext } from "../context/despachocontext";
import { DespachoInput } from "../inputs/despachoinput";
import { DespachoInsumoModel } from "../models/despachoinsumoModel";
import { DespachoModel } from "../models/despachoModel";


@Resolver()
export class DespachoResolver {

    @Mutation(() => DespachoModel)
    async agregarDespacho(
        @Args() undespacho: DespachoInput,
        @Ctx() context: IDespachoContext,

    ): Promise<DespachoModel> {
        const ot = undespacho.despachoinsumo.map((val) => {
            return { id: val.id, insumo: val.insumo, cantidad: val.cantidad, umedida: val.umedida }

        })

        const ve = {
            id: undespacho.id,
            despachoinsumo: ot
        }
        console.log(ve)

        return await context.dataSources.despacho.create({ dataObj: ve })
    }
    /*@Query(() => [DespachoModel])
    async listarDespachos(
        @Ctx() context: IDespachoContext
    ): Promise<DespachoModel[]> {
        return await context.dataSources.despacho.listAll()
    }

    @Mutation(() => String)
    async eliminarDespachoById(
        @Arg("id") id: string,
        @Ctx() context: IDespachoContext
    ): Promise<string> {
        return await context.dataSources.despacho.deleteById(id)
    }
    @Mutation(() => DespachoModel)
    async actualizarDespachoById(
        @Args() undespacho: DespachoInput,
        @Ctx() context: IDespachoContext
    ): Promise<DespachoModel> {

        return context.dataSources.despacho.update({ dataObj: undespacho }, undespacho.id)
    }*/
}