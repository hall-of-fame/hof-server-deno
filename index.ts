import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { departments, multiple, popular } from "./routers.ts";

const port = 8000;

const app = new Application();
const router = new Router()
    .get("/departments", departments)
    .get("/multiple", multiple)
    .get("/popular", popular);

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(
        `Listening on: http://${hostname ?? "localhost"}:${port}`,
    );
});

app.use(router.routes());

await app.listen({ port });