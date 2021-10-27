import 'reflect-metadata'

import { ArgsType, Field, InputType, InterfaceType, ObjectType } from "type-graphql";
import { Collection } from "fireorm";


@InterfaceType()
export class baseUsuarioInterface {
    @Field()
    id: string;
    @Field()
    firstName: string;
}

@ObjectType({ implements: baseUsuarioInterface })
export class baseUsuarioType implements baseUsuarioInterface {
    id: string;
    firstName: string

}


@ObjectType()
@Collection('Usuario') //nombre personalizado de la coleccion
export class UsuarioModel extends baseUsuarioType {    
    @Field()
    email: string;
    @Field()
    password: string;
}