// smart-update-websockets

// Imports
import express             from 'express';
import { WebSocketServer } from 'ws';

// Web server
const port =   process.env.port || 7777;
const server = express().use(express.static('web')).listen(port);
server.on('listening', () => console.log('--- Server listening on port:', server.address().port));
server.on('close',     () => console.log('--- Sever shutdown'));

// WebSockets server
const wsServer = new WebSocketServer({ server });
let nextClientId = 0;
const wsHandleConnection = (ws, request) => {
   const id = nextClientId++;
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
      console.log('--- Connected clients:', wsServer.clients.size);
      if (!wsServer.clients.size)
         server.close();
      };
   wsSend({ ok: true, id: id, note: 'Connection from client accepted' });
   console.log(id + '-> New connection from client [', request.connection.remoteAddress, ']');
   console.log('--- Connected clients:', wsServer.clients.size);
   ws.on('message', wsHandleIncoming);
   ws.on('close',   wsHandleClose);
   };
wsServer.on('listening', () => console.log('--- WebSockets ready'));
wsServer.on('connection', wsHandleConnection);
