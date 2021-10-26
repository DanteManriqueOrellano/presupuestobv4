import "reflect-metadata";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";


@Resolver()
export class OtraVieja{
	@Query(returns=>String)
	async otrotictoc(): Promise<string> {

		return "la que te pario"
	}
}