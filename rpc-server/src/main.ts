import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {
  GreeterHandlers,
  ProtoGrpcType,
} from '@nodejs-grpc-experiment/helloworld-types';

const PROTO_PATH = __dirname + '/../../helloworld.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).helloworld;

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
  server.addService(proto.Greeter.service, service);
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
