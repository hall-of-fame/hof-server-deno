import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { password } from "../config.ts"

if (password) {
    console.log("Authorization Enabled")
}

async function auth(ctx: Context, next: () => Promise<unknown>) {
    if (ctx.request.headers.get("Authorization") === password) {
        await next();
    } else {
        ctx.response.status = 401;
    }
}

export default auth;

