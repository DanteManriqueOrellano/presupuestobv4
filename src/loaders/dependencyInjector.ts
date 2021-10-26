import 'reflect-metadata'
import { Container } from 'typedi';
import agendaFactory from './agenda';//archivo que me permite hacer la instancia del animal, tendrá un aias para ser invocado, pueso que usa export defauklt
import Animal from '../agenda/lib';
import apolloFactory from "./apollo"
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { ClassType, NonEmptyArray} from 'type-graphql'


export default ({ fireormConnection, models }: { fireormConnection: any; models:  any  }) => {
	try {

		console.log(models)
		const inst = models.map((es: any) => {
			let tmp = new es()
			Container.set(tmp.constructor.name, tmp)//inyecta las instancias de todos los modelos que conforman el resolver
		})
		
		

		//const agendaInstance = agendaFactory({ fireormConnection });
		
		const agendaInstance: Animal = agendaFactory("la concha");//crea la instancia de la clase

		Container.set('agendaInstance', agendaInstance);//inyecta a las dependencias con el nombre agendaInstance

		console.info(`Agenda inyectado en el contenedor`);
		console.info(`apollo inyectado en el contenedor`);

		return { agenda: agendaInstance};//va a retornar la instancia del Animal
	} catch (e) {
		console.error('🔥 Error on dependency injector loader: %o', e);
		throw e;
	}
};