const { createServer } = require('http');
const redis = require('async-redis');
const redisClient = redis.createClient({ host: '127.0.0.1' });
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
let queue = [];
let inProcess = false;

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++)
        cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {
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
    }).listen(3003, () => {
        console.log('Listening on *:3003');
    })
}

