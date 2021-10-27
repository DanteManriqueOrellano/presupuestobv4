import { Arg, Args, ArgsType, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { IDespachoContext } from "../context/despachocontext";
import { DespachoInput } from "../inputs/despachoinput";
import { DespachoModel } from "../models/despachomodel";


@Resolver()
export class DespachoResolver {

    @Mutation(() => DespachoModel)
    async agregarDespacho(
        @Args() undespacho: DespachoInput,
        @Ctx() context: IDespachoContext,

    ): Promise<DespachoModel> {
        return await context.dataSources.despacho.create({ dataObj: undespacho })
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