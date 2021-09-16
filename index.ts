import { Application, Router, send } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { departments, multiple, popular } from "./routers.ts";
import { hostname, port, password } from "./config/config.ts"
import auth from "./middlewares/auth.ts";

const app = new Application();
const router = new Router()
    .get("/departments", departments)
    .get("/multiple", multiple)
    .get("/popular", popular);

if (password) {
    console.log("Authorization Enabled")
    app.use(auth);
}

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
        `Listening on: http://${hostname}:${port}`,
    );
});

await app.listen({ hostname, port });