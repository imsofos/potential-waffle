const { createServer } = require('http');
const redis = require('async-redis');
const redisClient = redis.createClient({ host: '127.0.0.1' });
let inProcess = null;
let isResolved = false;


createServer((req, res) => {
    if (!inProcess || isResolved)
        inProcess = bl();
    inProcess.then(output => {
        res.end(output)
    })
}).listen(3003, () => {
    console.log('Listening on *:3003');
})

async function bl() {
    const val = await redisClient.hget('metal', 'all')
    const a = JSON.parse(val);
    const b = JSON.stringify(a);
    isResolved = true
    return b;
}
