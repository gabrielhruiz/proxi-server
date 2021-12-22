const http = require('http');
const dotEnv = require('dotenv');

dotEnv.config();

http.createServer(onRequest).listen(process.env.PORT);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: process.env.PROXY_HOST_NAME,
    port: process.env.PROXY_PORT,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}