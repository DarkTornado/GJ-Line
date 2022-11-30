const http = require('http');
const subway = require('./subway');

http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8;',
        'Access-Control-Allow-Origin': '*'
    });
    var data = await subway.loadData();
    res.write(JSON.stringify(data));
    res.end();
}).listen(8080);