const WebSocket = require('ws');
const { spawn } = require('child_process');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  console.log('starting...')
  const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';
  const terminal = spawn(shell, [], {
    cwd: process.cwd(), // or any workspace directory
    env: process.env,
    shell: true,
  });

  terminal.stdout.on('data', (data) => {
    ws.send(data.toString());
  });

  terminal.stderr.on('data', (data) => {
    ws.send(data.toString());
  });

  terminal.on('close', () => {
    ws.send('Terminal session ended.');
    ws.close();
  });

  ws.on('message', (msg) => {
    terminal.stdin.write(msg);
  });

  ws.on('close', () => {
    terminal.kill();
  });
});
