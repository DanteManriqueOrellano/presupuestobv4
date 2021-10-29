import 'reflect-metadata';
import { Container } from "typedi";
import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';
import apolloLoader from './apollo'
import * as fireorm from 'fireorm';
import fireormLoader from './fireorm';
import { ApolloServer } from 'apollo-server-express';


export default async ({ expressApp }: any) => {
    const fireormConnection = fireorm.initialize(await fireormLoader());
    
    console.info('DB loaded and connected!');

    const resolvers = require('../graphql/mainResolver').default//Insumo
    const models = require('../graphql/mainModels').default

   
    //inyecta las instancias de todos los modelos y los almacena en el objeto mysource
    Container.set('mysource', await dependencyInjectorLoader({
        fireormConnection,
        models
    }))
    
    

    
    await expressLoader({ app: expressApp });//las que no son clases que no se instancian se leen aca.
    console.info('✌️ Express loaded');

    const apolloInstance: Promise<ApolloServer>  =  apolloLoader({ app: expressApp, resolvers })
    Container.set('apolloInstance', apolloInstance);
};