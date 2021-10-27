import 'reflect-metadata'
import { buildSchema, Query, Resolver, Args, Mutation, Arg, Ctx, PubSub, Publisher, Subscription, ResolverFilterData, Root } from 'type-graphql'
import { getRepository } from "fireorm";
import { EInsumo } from '../models/insumoModel';

import { IcontextInsumo } from '../context/contextInsumo';


@Resolver()
export class Insumo {

    //@UseMiddleware(isAuth)
    @Mutation(() => EInsumo)
    async agregarInsumo(
        @Args() insumo: EInsumo,
        @Ctx() context: IcontextInsumo,
        
    ): Promise<EInsumo> {
        return await context.dataSources.insumo.create({ dataObj: insumo})
    }
    @Query(() => [EInsumo])
    async listarInsumos(
        @Ctx() context: IcontextInsumo
    ): Promise<EInsumo[]> {
        return await context.dataSources.insumo.listAll()
    }

    @Mutation(() => String)
    async eliminarInsumoById(
        @Arg("id") id: string,
        @Ctx() context: IcontextInsumo
    ): Promise<string> {
        return await context.dataSources.insumo.deleteById(id)
    }
    @Mutation(() => EInsumo)
    async actualizarInsumoById(
        @Args() insumo: EInsumo,
        @Ctx() context: IcontextInsumo
    ): Promise<EInsumo> {

        return context.dataSources.insumo.update({ dataObj: insumo }, insumo.id)
    }
}
