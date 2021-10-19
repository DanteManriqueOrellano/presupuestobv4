import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, { NextFunction, Response, Request }   from "express";
import { buildSchema } from 'type-graphql'
import IORedis from 'ioredis'
import RedisPubSubEngine from 'graphql-ioredis-subscriptions'
import { RecipeResolver } from "./recipe.resolver";
import { SampleResolver } from "./resolver";
import WebSocket from "ws";
const fs = require('fs');
import {  DataSource } from "apollo-datasource";



const port = process.env.PORT || 3000

const http = require('https');
 
const app = express()

async function bootstrap(){
    const optionshttps = {
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem')
      };
    const httpServer = http.createServer(optionshttps);

    
    
    const options: IORedis.RedisOptions = {
        
        retryStrategy: times => Math.max(times * 100, 3000),
        tls: {
            rejectUnauthorized: false
        },
        
        
      };

    const pubSub = new RedisPubSubEngine({
        pub: new IORedis(process.env.REDIS_TLS_URL,options),
        sub: new IORedis(process.env.REDIS_TLS_URL,options),
        /* optional */
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

    const schema = buildSchema({
        resolvers : [RecipeResolver,SampleResolver],
        validate:false,
        pubSub
        

    })

    const apolloServer = new ApolloServer({ 
        schema: await schema,
        subscriptions: {
            onConnect: async (connectionParams, webSocket:WebSocket) => {
                
                webSocket.on('connection', (ws) => {
                    console.log('Client connected');
                    ws.on('close', () => console.log('Client disconnected'));
                });
                console.log(connectionParams);
                console.log(webSocket)
            },
            onDisconnect :async (con,web)=>{
                console.log(con)
                console.log(web)
            },
            path:"/graphql",
            
        },
        playground:true,
        introspection:true,
        formatError: (err) => {
            // Don't give the specific errors to the client.
            if (err.message.startsWith('Database Error: ')) {
                return new Error('Internal server error')
            }
            return err
        },
    });
    
    
    apolloServer.applyMiddleware({app,path:"/graphql"})
    apolloServer.installSubscriptionHandlers(httpServer)
    app.get("/admin",(req: Request, res: Response, next: NextFunction)=>{

        try {

            res
			.status(200)
			.set('Content-Type', 'text/plain')
			.send(`Last 10 visits:${req.ip}`)
			.end()

        } catch(error) {
            console.log(error)
		    next(error)
        }

    })
    httpServer.listen(port, () => {
        console.log(
          `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`,
        );
        console.log(
          `🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`,
        );
    });
    
}
 
bootstrap()

