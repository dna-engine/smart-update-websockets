// dnajs-smart-update-websockets

// Imports
const express =   require('express');
const WebSocket = require('ws');

// Web server
const port = process.env.port || 7777;
const server = express().use(express.static('web')).listen(port);
server.on('listening', () => console.log('--- Server listening on port:', server.address().port));
server.on('close',     () => console.log('--- Sever shutdown'));

// WebSockets server
const wsServer = new WebSocket.Server({ server });
let nextId = 0;
const wsHandleConnection = (ws, request) => {
   const id = nextId++;
   const wsSend = (message) => {
      console.log(id + '-> Outgoing:', message);
      ws.send(JSON.stringify(message));
      };
   const wsHandleIncoming = (string) => {
      const message = JSON.parse(string);
      console.log(id + '-> Incoming:', message);
      };
   const wsHandleClose = (code) => {
      console.log(id + '-> Disconnected: close code', code);
      console.log('--- Total clients:', wsServer.clients.size);
      if (!wsServer.clients.size)
         server.close();
      };
   wsSend({ ok: true, note: 'Connection from client accepted' });
   console.log(id + '-> New connection from client:', request.connection.remoteAddress);
   console.log('--- Total clients:', wsServer.clients.size);
   ws.on('message', wsHandleIncoming);
   ws.on('close',   wsHandleClose);
   };
wsServer.on('listening', () => console.log('--- WebSockets ready'));
wsServer.on('connection', wsHandleConnection);
