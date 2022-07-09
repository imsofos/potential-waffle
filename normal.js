const { createServer } = require('http');
const redis = require('async-redis');
const redisClient = redis.createClient({ host: '127.0.0.1' });


createServer((req, res) => {
    redisClient.hget('metal', 'all').then(val => {
        const a = JSON.parse(val);
        const b = JSON.stringify(a);
        res.end(b)
    })
}).listen(3001, () => {
    console.log('Listening on *:3001');
})
//Requests / sec: 5860.21
//Requests / sec: 7013.04
//Requests / sec: 6976.98
//Requests / sec: 6913.70