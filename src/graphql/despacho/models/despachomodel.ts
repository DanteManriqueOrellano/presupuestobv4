import { Collection, SubCollection, ISubCollection  } from "fireorm";
import { ArgsType, Field, ObjectType } from "type-graphql";
import { BaseDespachoType } from "../types/basedespachotype";


@ObjectType()
@Collection()
export class DespachoModel extends BaseDespachoType {


}