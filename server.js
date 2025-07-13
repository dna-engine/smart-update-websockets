// smart-update-websockets

// Imports
import { WebSocketServer } from 'ws';
import express from 'express';

// Web server
const port =   process.env.port || 7777;
const server = express().use(express.static('web')).listen(port);
server.on('listening', () => console.info('--- Server listening on port:', server.address().port));
server.on('close',     () => console.info('--- Sever shutdown'));

// WebSockets server
const wsServer = new WebSocketServer({ server });
let nextClientId = 0;
const wsHandleConnection = (ws, request) => {
   const id = nextClientId++;
   const wsSend = (message) => {
      console.info(id + '-> Outgoing:', message);
      ws.send(JSON.stringify(message));
      };
   const wsHandleIncoming = (string) => {
      const message = JSON.parse(string);
      console.info(id + '-> Incoming:', message);
      };
   const wsHandleClose = (code) => {
      console.info(id + '-> Disconnected: close code', code);
      console.info('--- Connected clients:', wsServer.clients.size);
      if (!wsServer.clients.size)
         server.close();
      };
   wsSend({ ok: true, id: id, note: 'Connection from client accepted' });
   console.info(id + '-> New connection from client [', request.connection.remoteAddress, ']');
   console.info('--- Connected clients:', wsServer.clients.size);
   ws.on('message', wsHandleIncoming);
   ws.on('close',   wsHandleClose);
   };
wsServer.on('listening', () => console.info('--- WebSockets ready'));
wsServer.on('connection', wsHandleConnection);
