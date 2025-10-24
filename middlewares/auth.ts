import { Context } from "oak";
import { password } from "../config/index.ts";

if (password) {
    console.log("[LOG] Authorization Enabled");
}

async function auth(ctx: Context, next: () => Promise<unknown>) {
    if (ctx.request.headers.get("Authorization") === password) {
        await next();
    } else {
        ctx.response.status = 401;
    }
}

export default auth;
