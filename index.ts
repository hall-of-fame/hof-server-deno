import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { hostname, port, password } from "./config.ts";
import { auth, root, routes, logger } from "./middlewares.ts"

const app = new Application();

app.use(logger);
if (password)
    app.use(auth);
app.use(root);
app.use(routes);

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(`[LOG] Listening on: http://${hostname}:${port}`);
});

await app.listen({ hostname, port });