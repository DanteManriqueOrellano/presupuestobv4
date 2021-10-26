import "reflect-metadata";
import { Query, Resolver } from "type-graphql";


@Resolver()
export class TicToe {
    @Query()
    async tictactoe(): Promise<string> {

        return "tic tac toe"
    }
}
