import { Application } from 'oak';

import { hostname, password, port, secure } from './config/index.ts';
import { auth, logger, root, routes } from './middlewares/index.ts';

const app = new Application();

app.use(logger);
app.use(root);
if (password) {
  app.use(auth);
}
app.use(routes);

app.addEventListener('listen', ({ hostname, port }) => {
  console.log(`[LOG] Listening on: http://${hostname}:${port}`);
});

const listenOptions = {
  hostname,
  port,
  ...(secure
    ? {
      secure: true,
      certFile: './config/tls/full_chain.pem',
      keyFile: './config/tls/private.key',
    } as const
    : { secure: false } as const),
};

await app.listen(listenOptions);
