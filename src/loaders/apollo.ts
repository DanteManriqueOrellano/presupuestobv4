import 'reflect-metadata'
import { ApolloServer} from "apollo-server-express";
import { buildSchema, ClassType, NonEmptyArray, Query, Resolver, ArgsType, Field, InputType, ObjectType, registerEnumType, Args, Mutation, Arg } from 'type-graphql'
import { Collection, getRepository } from "fireorm";
import express from 'express';
import IORedis from 'ioredis'
import RedisPubSubEngine from 'graphql-ioredis-subscriptions'
import { EInsumo } from '../graphql/insumo/models/insumoModel';
import { InsumoCrud } from '../graphql/insumo/services/insumoCrud';
import { UsuarioCrud } from '../graphql/usuario/service/usuarioCrud';
import { UsuarioModel } from '../graphql/usuario/indexModels';
import Container from 'typedi';

export default async ({ app, resolvers }: { app: express.Application; resolvers: any }) => {


    const options: IORedis.RedisOptions = {
        port: 6379,
        host: "localhost",
        
        retryStrategy: times => Math.max(times * 100, 4000),
        /*tls: {
            rejectUnauthorized: false,
            
        },*/ //activar cuando se configure las subscripciones
        


    };

    const pubSub = new RedisPubSubEngine({
        pub: new IORedis(options),//(process.env.REDIS_TLS_URL, options),
        sub: new IORedis(options),
        // optional 
        // defaults to JSON
        parser: {
            stringify: (val) => JSON.stringify(val),
            parse: (str) => JSON.parse(str)
        },
        // defaults to console
        logger: {
            warn: (...args) => console.warn(...args),
            error: (...args) => console.error(...args)
        },

    });
    const schemas: Promise<any> = buildSchema({
        resolvers: resolvers,
        validate: false,
        //pubSub activar cuando se configure las subscripciones

    })

    const server = new ApolloServer({
        schema: await schemas,
        playground: true,
        introspection: true,
        formatError: (err) => {
            // Don't give the specific errors to the client.
            if (err.message.startsWith('Database Error: ')) {
                return new Error('Internal server error')
            }
            return err
        },

        dataSources: () => (Container.get('mysource')),

       /* subscriptions: {
            onConnect: async (connectionParams, webSocket) => {

                webSocket.on('connection', (ws) => {
                    console.log('Client connected');
                    ws.on('close', () => console.log('Client disconnected'));
                });
                //console.log(connectionParams);
                console.log("dentro de onConect")
            },
            onDisconnect: async (con, web) => {

                console.log("dentro de on disocnect")
            },
            path: "/graphql",

        },*/// activar cuando se configure las subscripciones

            
        
    });
    return await server
    
}
