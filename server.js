// dnajs-smart-update-websockets

// Modules
const express =   require('express');
const http =      require('http');
const WebSocket = require('ws');

// Web server
const port = 7777;
const app =  express();
app.use(express.static('web'));
const server = http.createServer(app);

// WebSockets server
const wsServer = new WebSocket.Server({ server });
function wsHandleConnection(ws, request) {
   function wsSend(message) {
      console.log('Outgoing:', message);
      ws.send(JSON.stringify(message));
      }
   function wsHandleIncoming(string) {
      const message = JSON.parse(string);
      console.log('Incoming:', message);
      }
   function wsHandleClose(code) {
      console.log('Disconnected: close code %d', code);
      }
   wsSend({ ok: true, note: 'Connection from client accepted' });
   console.log('New connection from client: %s', request.connection.remoteAddress);
   ws.on('message', wsHandleIncoming);
   ws.on('close',   wsHandleClose);
   }
wsServer.on('connection', wsHandleConnection);

// Server startup
function handleServerReady() {
   const url = 'http://localhost:' + server.address().port;
   console.log('In your web browser, go to:');
   console.log(url);
   console.log('\n--- Server listening (hit CTRL-C to stop server) ---');
   }
server.listen(port, handleServerReady);
