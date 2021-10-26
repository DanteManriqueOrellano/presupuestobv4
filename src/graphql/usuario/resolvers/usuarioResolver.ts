import 'reflect-metadata'
import { Args, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcrypt";
import { getRepository } from "fireorm";
import { Service } from "typedi";
import { Usuario } from '../models/usuarioModel';

//import { isAuth } from "../../middleware/isAuth";


@Service({ global: true })
@Resolver()
export class RegisterUserResolver {

    //@UseMiddleware(isAuth)
    @Mutation(() => Usuario)
    async registerUser(

        @Args() user: Usuario,

    ): Promise<Usuario> {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        const userRepository = getRepository(Usuario);
        const newUser = await userRepository.create({
            password: user.password,
            email: user.email,
            firstName: user.firstName,
        });
        return newUser
    }
}