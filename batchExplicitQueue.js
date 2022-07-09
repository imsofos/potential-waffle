const { createServer } = require('http');
const redis = require('async-redis');
const redisClient = redis.createClient({ host: '127.0.0.1' });
let queue = [];
let inProcess = false;


createServer((req, res) => {
    queue.push(res);
    if (!inProcess) {
        inProcess = true
        redisClient.hget('metal', 'all').then(val => {
            const a = JSON.parse(val);
            const b = JSON.stringify(a);
            for (let i = 0; i < queue.length; i++)
                queue[i].end(b)
            queue = []
            inProcess = false
        })
    }
}).listen(3002, () => {
    console.log('Listening on *:3002');
})
// Requests / sec: 18941.03
// Requests / sec: 16732.72
// Requests / sec: 16601.58
// Requests / sec: 16904.20