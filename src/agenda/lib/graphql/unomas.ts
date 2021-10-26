import "reflect-metadata";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";


@Resolver()
export class unamas {
	@Query(returns => String)
	async otritamas(): Promise<string> {

		return "tu simomn"
	}
}