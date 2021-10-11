import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Query, Resolver } from 'type-graphql'

import IORedis from 'ioredis'
import RedisPubSubEngine from 'graphql-ioredis-subscriptions'
import { createServer } from 'http';
import { RecipeResolver } from "./recipe.resolver";
import { SampleResolver } from "./resolver";
const port = process.env.PORT || 3000
const http = require('http');
/*const express = require('express')
const axios = require('axios')
const redis = require('redis')
const responseTime = require('response-time');
const { promisify } = require('util');




const app = express()
const port = process.env.PORT || 3000

const client = redis.createClient({
    host: "ec2-52-5-212-47.compute-1.amazonaws.com"
    ,port: 23120
    ,password:"p084e82949e443be46868bb05142b8b5443c90f2b55c954adbeec014ec7227672"
    ,detect_buffers: true,
    tls: {
        rejectUnauthorized: false
    }
})
.on('error', function (err:any) {
    console.error(err);
  })
  .on('connect', function () {
    console.debug('Redis connected ');
  });

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

app.use(responseTime())

app.get('/character', async(req:any, res:any, next:any) => {
    try {
        const reply = await GET_ASYNC('jokes');
        if (reply) {
            console.log('using cached data');
            return res.send(JSON.parse(reply))
        }

        const response = await axios.get('https://rickandmortyapi.com/api/character')
        const saveResult = await SET_ASYNC('jokes', JSON.stringify(response.data), 'EX', 10);

        console.log('saved data:', saveResult);

        res.send(response.data)
    } catch (error:any) {
        res.send(error.message)
    }
});

app.get('/character/:id', async (req:any, res:any, next:any) => {
    try {
        const reply = await GET_ASYNC(req.params.id);
        if (reply) {
            console.log('using cached data');
            return res.send(JSON.parse(reply))
        }

        const response = await axios.get('https://rickandmortyapi.com/api/character/' + req.params.id);
        const saveResult = await SET_ASYNC(req.params.id, JSON.stringify(response.data), 'EX', 15);

        console.log('saved data:', saveResult);

        res.send(response.data)
    } catch (error:any) {
        console.log(error)
        res.send(error.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
*/

@Resolver()
export class Tic{
    @Query(()=>String)
    tic():string{
        return "toc"

    }

}

async function bootstrap(){
    const options: IORedis.RedisOptions = {
        host: "ec2-52-5-212-47.compute-1.amazonaws.com",
        port: 23120,
        password:"p084e82949e443be46868bb05142b8b5443c90f2b55c954adbeec014ec7227672",
        retryStrategy: times => Math.max(times * 100, 3000),
        tls: {
            rejectUnauthorized: false
        },
        
      };
    const pubSub = new RedisPubSubEngine({
        pub: new IORedis(options),
        sub: new IORedis(options),
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
            onConnect: async (connectionParams, wss) => {
                wss.on('connection', (ws) => {
                    console.log('Client connected');
                    ws.on('close', () => console.log('Client disconnected'));
                  });
              console.log('xxx');
              console.log(connectionParams);
            },
            path:"/graphql"
          },
        
        
        
        
    })
    
    const app = express()
    const httpServer = http.createServer(app);
    await apolloServer.start()
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



