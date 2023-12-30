import * as grpc from '@grpc/grpc-js';
import { helloworldPackageDefinition } from '@nodejs-grpc-experiment/helloworld-grpc-package-definition';
import { GreeterHandlers } from '@nodejs-grpc-experiment/helloworld-grpc-types';

const service: GreeterHandlers = {
  SayHello: (call, callback) => {
    callback(null, { message: 'Hello ' + call.request.name });
  },
  SayHelloStreamReply: (): void => {
    throw new Error('Unimplemented.');
  },
};

function main() {
  const server = new grpc.Server();
  server.addService(helloworldPackageDefinition.Greeter.service, service);
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
