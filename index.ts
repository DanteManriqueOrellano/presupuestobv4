import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { NextFunction, Response, Request } from "express";
import { Container } from 'typedi'
const port = process.env.PORT || 3000

const http = require('http');


class Server {
    private apolloServer: ApolloServer;
    private app: express.Application = express();
    private httpServer: any

    
    
    constructor() {
        
        this.httpServer = http.createServer(this.app);
       // const RedisStore = connectRedis(session)

        new Promise(resolve => {

            resolve(require('./src/loaders').default({ expressApp: this.app }));
        }).then(() => {

            this.resolverServer()
            
            this.startServer(this.httpServer);

            
            this.app.get("/admin",
                (req: Request, res: Response, next: NextFunction) => {/// esta funcion tiene que ser un controlador

                    try {

                        res
                            .status(200)
                            .set('Content-Type', 'text/plain')
                            .send(`Last 10 visits:${req.ip}`)
                            .end()

                    } catch (error) {
                        console.log(error)
                        next(error)
                    }

                })
        });
    }

    private startServer(httpServer: any) {
       httpServer.listen(port, () => {
            console.log(
               `🚀 Server ready at http://localhost:${port}${this.apolloServer.graphqlPath}`,
            );
            console.log(
                `🚀 Subscriptions ready at ws://localhost:${port}${this.apolloServer.subscriptionsPath}`,
            );
        });
    }
    private resolverServer() {
        /**
         * la instancia del contenedor retorna una promesa de ApolloServer
         * */
        const apollo: Promise<ApolloServer> = Container.get('apolloInstance')
        /*
         resuelve la promesa para asignar el valor al atributo
         */
        apollo.then(async (server) => {
            const app = this.app;
            this.apolloServer = server;



            await this.apolloServer.start();
            this.apolloServer.applyMiddleware({ app, path: "/graphql" });
            //this.apolloServer.installSubscriptionHandlers(this.httpServer) //activar cuando se tengan listas las subscripciones

        })
            .catch((error) => { console.log(error) })

    }
}
new Server();
