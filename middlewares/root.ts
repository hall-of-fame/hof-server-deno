import { send } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";

async function root(ctx: Context, next: () => Promise<unknown>) {
    if (ctx.request.url.pathname.startsWith("/static/")) {
        await handleStaticRequest(ctx);
    } else {
        await next();
        ctx.response.body = {
            data: ctx.response.body
        }
    }
}

async function handleStaticRequest(ctx: Context) {
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
}

export default root;