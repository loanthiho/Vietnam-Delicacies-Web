const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const ngrok = require('ngrok');

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server runing on port:${port}`);
});