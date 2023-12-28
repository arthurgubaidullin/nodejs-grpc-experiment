import { messages, services } from '@nodejs-grpc-experiment/helloworld-proto';
import grpc from '@grpc/grpc-js';

function sayHello(call, callback) {
  const reply = new messages.HelloReply();
  reply.setMessage('Hello ' + call.request.getName());
  callback(null, reply);
}

function main() {
  const server = new grpc.Server();
  server.addService(services.GreeterService, { sayHello: sayHello });
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
