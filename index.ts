import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Query, Resolver } from 'type-graphql'
import IORedis from 'ioredis'
import RedisPubSubEngine from 'graphql-ioredis-subscriptions'
import { RecipeResolver } from "./recipe.resolver";
import { SampleResolver } from "./resolver";

const port = process.env.PORT || 3000
const con = process.env.REDIS_TLS_URL
const http = require('http');

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
                
                webSocket.on('connection', (wss) => {
                    console.log('Client connected');
                    wss.on('close', () => console.log('Client disconnected'));
                  });
              console.log('xxx');
              console.log(connectionParams);
            },
            path:"/graphql",
            
          },
          playground:true,
          introspection:true
        
        
        
        
    })
    
   
    const httpServer = http.createServer(app);
    apolloServer.applyMiddleware({app})
    apolloServer.installSubscriptionHandlers(httpServer)
    
   
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



