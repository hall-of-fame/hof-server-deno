import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { host, password, port, secure } from "./config/index.ts";
import { auth, logger, root, routes } from "./middlewares.ts";

const app = new Application();

app.use(logger);
app.use(root);
if (password) {
    app.use(auth);
}
app.use(routes);

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(`[LOG] Listening on: http://${hostname}:${port}`);
});

const listenOptions = Object.assign(
    {},
    {
        host,
        port,
    },
    secure
        ? {
            secure: true,
            certFile: "./config/tls/full_chain.pem",
            keyFile: "./config/tls/private.key",
        }
        : {},
);

await app.listen(listenOptions);
