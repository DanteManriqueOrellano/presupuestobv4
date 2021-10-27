import 'reflect-metadata'
import { Container } from 'typedi';
import agendaFactory from './agenda';//archivo que me permite hacer la instancia del animal, tendrá un aias para ser invocado, pueso que usa export defauklt
import Animal from '../agenda/lib';
import apolloFactory from "./apollo"
import usuarioFactory from './usuario'
import insumoFactory from './insumo'
import despachoFactory from './despacho'
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { ClassType, NonEmptyArray} from 'type-graphql'
import { UsuarioModel } from '../graphql/usuario/indexModels';
import { EInsumo } from '../graphql/insumo/indexModels';
import { DespachoModel } from '../graphql/despacho/models/despachomodel';


export default ({ fireormConnection, models }: { fireormConnection: any; models:  any  }) => {
	try {

		console.log(models)
		const inst = models.map((es: any) => {
			let tmp = new es()
			
			Container.set(tmp.constructor.name, tmp)//inyecta las instancias de todos los modelos que conforman el resolver
		})

		const insumoInstance = insumoFactory(EInsumo)
		
		const usuarioInstance = usuarioFactory( UsuarioModel )

		const despachoInstance = despachoFactory(DespachoModel)

		//tener en cuenta que el nombre de la llave del objeto tiene que ser el mismo del contexto para evitar errores
		return {
			insumo: insumoInstance,
			usuario: usuarioInstance,
			despacho: despachoInstance
		};//va a retornar un objeto de instancias
	} catch (e) {
		console.error('🔥 Error on dependency injector loader: %o', e);
		throw e;
	}
};