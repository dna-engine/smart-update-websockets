var app = {
   wsUrl: 'ws://localhost:8777/',
   ws: null,  //instance of WebSocket
   wsSend: function(message) {
      message.timestamp = Date.now();
      app.log({ outgoing: message });
      app.ws.send(JSON.stringify(message));
      },
   wsHandleMessageEvent: function(event) {
      app.log({ incoming: JSON.parse(event.data) });
      },
   wsHandleConnectEvent: function(event) {
      app.log({ connected: event.target.url });
      app.wsSend({ note: 'Client is connected' });
      },
   wsInit: function() {
      app.ws = new WebSocket(app.wsUrl);
      app.ws.onopen =   app.wsHandleConnectEvent;
      app.ws.onmessage = app.wsHandleMessageEvent;
      },
   actionSendMessage: function(inputElem) {
      app.wsSend({ text: inputElem.val() });
      },
   actionDisconnect: function() {
      app.ws.close();
      app.log('*** End ***');
      },
   log: function(value) {
      dna.clone('log', { value: JSON.stringify(value) }, { fade: true, top: true });
      },
   setup: function() {
      app.log('*** Start ***');
      app.wsInit();
      }
   };
