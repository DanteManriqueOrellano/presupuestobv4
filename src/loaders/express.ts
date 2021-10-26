import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/status', (_req, res) => {
        res.status(200).end();
    });
    app.head('/status', (_req, res) => {
        res.status(200).end();
    });

    // Load API routes
    //app.use("/api", routes());

    
};