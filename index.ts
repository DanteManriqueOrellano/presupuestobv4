const express = require('express')
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
