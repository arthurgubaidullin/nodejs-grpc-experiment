import * as grpc from '@grpc/grpc-js';
import { helloworldPackageDefinition } from '@nodejs-grpc-experiment/helloworld-grpc-package-definition';

describe('CLI tests', () => {
  it('should print a message', (done) => {
    const client = new helloworldPackageDefinition.Greeter(
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
