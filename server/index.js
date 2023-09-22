// Vanilla node server
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World!\n');
});

server.listen(4242, () => {
    console.log("server is running...")
})