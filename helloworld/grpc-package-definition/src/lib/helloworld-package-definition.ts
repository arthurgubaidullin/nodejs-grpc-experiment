import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '@nodejs-grpc-experiment/helloworld-grpc-types';
import { join } from 'path';

const PROTO_PATH = join(__dirname, 'helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const helloworldPackageDefinition = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).helloworld;
