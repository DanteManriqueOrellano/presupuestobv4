import 'reflect-metadata'
import { Args, ArgsType, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcrypt";
import { getRepository } from "fireorm";
import { Service } from "typedi";
import { UsuarioModel } from '../models/usuarioModel';
import { IcontextUsuario } from '../context/contextUsuario';
//import { isAuth } from "../../middleware/isAuth";





@ArgsType()
@InputType()
export class usuarioInput {
    @Field()
    id: string;
    @Field()
    firstName: string;
    @Field()
    email: string;
    @Field()
    password: string;
}




@Service({ global: true })
@Resolver()
export class RegisterUserResolver {
    @Mutation(() => UsuarioModel)
    async registerUser(
        @Args() user: usuarioInput,
        @Ctx() context: IcontextUsuario

    ): Promise<UsuarioModel> {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        const newUser = {
            password: user.password,
            email: user.email,
            firstName: user.firstName,
        };

        return await context.dataSources.usuario.create({ dataObj: newUser})
    }
}