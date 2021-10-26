import "reflect-metadata";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";


@Resolver()
export class TuVieja {
	@Query(returns=>String)
	async tictactoe(): Promise<string> {

		return "tu otra vieja"
	}
}
