import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './helloworld';

const PROTO_PATH = __dirname + '/../../../protos/helloworld.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const helloProto = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).helloworld;

describe('CLI tests', () => {
  it('should print a message', (done) => {
    const client = new helloProto.Greeter(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );

    client.sayHello({ name: 'World' }, function (err, response) {
      expect(err).toBeNull();
      expect(response?.message).toEqual('Hello World');

      done();
    });
  });
});
