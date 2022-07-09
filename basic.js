const { createServer } = require('http');

createServer((req, res) => {
    res.end('w')
}).listen(3000, () => {
    console.log('Listening on http://127.0.0.1:3000');
})
//Requests / sec: 17705.59
//Requests / sec: 18126.04
//Requests / sec: 18084.15
//Requests / sec: 18246.17