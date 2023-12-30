// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import {
  GreeterClient,
  HelloRequest,
} from '@nodejs-grpc-experiment/rpc-web-client-vite';

export function App() {
  const [state, setState] = useState('');
  useEffect(() => {
    const f = async () => {
      const client = new GreeterClient(
        'http://' + window.location.hostname + ':8080',
        null,
        null
      );
      const request = new HelloRequest();
      request.setName('World');
      client.sayHello(request, {}, (err, response) => {
        if (err) {
          setState(
            `Unexpected error for sayHello: code = ${err.code}` +
              `, message = "${err.message}"`
          );
        } else {
          setState(response.getMessage());
        }
      });
    };
    f();
  }, []);
  return <div>{state}</div>;
}

export default App;
