import 'reflect-metadata'

import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import { Collection } from "fireorm";
@ArgsType()
@ObjectType()
@InputType()
@Collection('UsuarioPrincipal') //nombre personalizado de la coleccion
export class UsuarioPrincipal {
    @Field()
    id: string;
    @Field()
    firstName: string;
    @Field()
    email: string;
    @Field()
    password: string;
}