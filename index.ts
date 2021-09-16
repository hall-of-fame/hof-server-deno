import { Application, Router, send } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { departments, multiple, popular } from "./routers.ts";
import { port } from "./config/config.ts"

const app = new Application();
const router = new Router()
    .get("/departments", departments)
    .get("/multiple", multiple)
    .get("/popular", popular);

app.use(async (ctx, next) => {
    if (ctx.request.url.pathname.startsWith("/static/")) {
        try {
            await send(ctx, ctx.request.url.pathname.slice(8), {
                root: `${Deno.cwd()}/static/`,
            })
        } catch (error) {
            if (error.name === "NotFoundError") {
                const pathname = decodeURI(ctx.request.url.pathname).replaceAll(" ", "%20");
                console.log(`404: ${pathname}`)
            }
        }
    } else {
        await next();
        ctx.response.body = {
            data: ctx.response.body
        }
    }
})

app.use(router.routes());

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(
        `Listening on: http://${hostname ?? "localhost"}:${port}`,
    );
});

await app.listen({ port });