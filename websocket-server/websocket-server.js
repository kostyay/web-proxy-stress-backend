const randomBufferLength = process.env.SEND_BUFFER_LENGTH | 1000;
const listenPort = process.env.LISTEN_PORT | 8080;

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: listenPort });

console.log(`Server starting on port ${listenPort}; buffer length=${randomBufferLength}`);

var connectionsCount = 0;

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

let randomBuffer = randomString(randomBufferLength, null);

wss.on('connection', function connection(ws) {
  connectionsCount++;
  console.log("[*] Got new connection. totalCount=" + connectionsCount);
  let buf = randomBuffer;
  ws.send(buf);
  console.log("-> Sent buffer " + buf.length);
  ws.on('close', (code, reason) => {
    connectionsCount--;
    console.log(`[x] Client connection closed: ${code}; ${reason}`);
  });
  ws.on('message', function incoming(data) {
    // console.log(`<- Got incoming data: ${data}`);
    wss.clients.forEach(function each(client) {
      //console.log(`Client state: ${client.readyState} ${WebSocket.OPEN}`);
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        //console.log(`-> Sending data ${data}`);
      }
    });
  });
});
