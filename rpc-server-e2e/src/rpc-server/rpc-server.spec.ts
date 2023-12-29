import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './helloworld';

const PROTO_PATH = __dirname + '../../../protos/helloworld.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const hello_proto = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).helloworld;

describe('CLI tests', () => {
  it('should print a message', () => {
    const client = new hello_proto.Greeter(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );

    client.sayHello({ name: 'world' }, function (err, response) {
      expect(response?.message).toMatch(/Hello World/);
    });
  });
});
