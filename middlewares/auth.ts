import { createHash } from "https://deno.land/std@0.107.0/hash/mod.ts";
import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { password } from "../config.ts"

if (password) {
    console.log("Authorization Enabled")
}

const hashStr = createHash("sha3-512").update(password ?? "").toString();

async function auth(ctx: Context, next: () => Promise<unknown>) {
    if (ctx.request.headers.get("Authorization") === hashStr) {
        await next();
    } else {
        ctx.response.status = 401;
    }
}

export default auth;

