import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";

import { departments, multiple, popular } from "./routers.ts";
import { hostname, port, password } from "./config.ts";
import { auth, root } from "./middlewares.ts"

const app = new Application();
const router = new Router()
    .get("/departments", departments)
    .get("/multiple", multiple)
    .get("/popular", popular);

if (password) {
    console.log("Authorization Enabled")
    app.use(auth);
}
app.use(root);
app.use(router.routes());

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(`Listening on: http://${hostname}:${port}`);
});

await app.listen({ hostname, port });