//! dnajs-smart-update-websockets ~ MIT License

const app = {
   wsUrl: 'ws://localhost:7777/',
   ws: null,  //instance of WebSocket
   wsSend(message) {
      message = { timestamp: Date.now(), ...message };
      app.log({ outgoing: message });
      app.ws.send(JSON.stringify(message));
      },
   wsHandleMessageEvent(event) {
      app.log({ incoming: JSON.parse(event.data) });
      },
   wsHandleConnectEvent(event) {
      app.log({ connected: event.target.url });
      app.wsSend({ note: 'Client is connected' });
      },
   wsInit() {
      app.ws = new WebSocket(app.wsUrl);
      app.ws.onopen =   app.wsHandleConnectEvent;
      app.ws.onmessage = app.wsHandleMessageEvent;
      },
   actionSendMessage(inputElem) {
      app.wsSend({ text: inputElem.val() });
      },
   actionDisconnect() {
      app.ws.close();
      app.log('*** End ***');
      },
   log(value) {
      dna.clone('log', { value: JSON.stringify(value) }, { fade: true, top: true });
      },
   setup() {
      app.log('*** Start ***');
      app.wsInit();
      },
   };
