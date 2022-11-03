import net from 'node:net';

const options ={
  host: '127.0.0.1',
  port: 4000
}

const client = net.createConnection(options)

client.on('connect',()=>{
  console.log('client connected')
  client.write('3 + 2')
})

client.on('data',(data)=>{
  console.log('message from server: ',data.toString('utf8'));
})
client.on('error',()=>{
  console.log('client error', error.message)
})
