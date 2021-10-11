import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Query, Resolver } from 'type-graphql'
import IORedis from 'ioredis'
import RedisPubSubEngine from 'graphql-ioredis-subscriptions'
import { RecipeResolver } from "./recipe.resolver";
import { SampleResolver } from "./resolver";
import WebSocket from "ws";
const port = process.env.PORT || 3000
const con = process.env.REDIS_TLS_URL
const http = require('http');
//require('dotenv').config()
@Resolver()
export class Tic{
    @Query(()=>String)
    tic():string{
        return "toc"

    }

}
const app = express()
async function bootstrap(){
    
    const options: IORedis.RedisOptions = {
        
        /*host: "ec2-52-5-212-47.compute-1.amazonaws.com",
        port: 23120,
        password:"p084e82949e443be46868bb05142b8b5443c90f2b55c954adbeec014ec7227672",*/
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
            onConnect: async (connectionParams, webSocket) => {
                
                webSocket.on('connection', (ws:WebSocket) => {
                    console.log('Client connected');
                    ws.on('close', () => console.log('Client disconnected'));
                  });
              console.log('xxx');
              console.log(connectionParams);
            },
            path:"/graphql"
          },
          playground:true,
          introspection:true
        
        
        
        
    })
    
   
    const httpServer = http.createServer(app);
    //await apolloServer.start()
    apolloServer.applyMiddleware({app})
    apolloServer.installSubscriptionHandlers(httpServer)
    
    /*app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })*/

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



