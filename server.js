import net from 'node:net';

const server = net.createServer();

server.on('connection',(socket)=>{
  socket.on('data',(data)=>{
    console.log('host: ',socket.remoteAddress, 'port: ',socket.remotePort);
    console.log('Client message: ', data.toString('utf8'));
    resolveMessage(data,socket);
    socket.end('ending connection');
  })

  socket.on('close',()=>{
    console.log('Client disconnected')
  })

  socket.on('error',(err)=>{
    console.log('server error', err.stack)
  })

})

const resolveMessage=(data,socket) => {
  const newData  = data.toString()
  const dataSplited = newData.split(" ")
  let result = 0;

  if(dataSplited.length != 3){
    return socket.write('message supported Ex: "1 + 2"')
  }

  switch(dataSplited[1]){
    case '+': result = Number(dataSplited[0]) + Number(dataSplited[2]);
    break;
    case '-': result = Number(dataSplited[0]) - Number(dataSplited[2]);
    break;
    case '*': result = Number(dataSplited[0]) * Number(dataSplited[2]);
    break;
    case '/': result = Number(dataSplited[0]) / Number(dataSplited[2]);
    break;
  }

  return socket.write(result.toString())
}

server.listen(4000,() => {
  console.log('listening on port ' + 4000 );
})