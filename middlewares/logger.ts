import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { gray, green, red, yellow } from "https://deno.land/std@0.109.0/fmt/colors.ts";

async function logger(ctx: Context, next: () => Promise<unknown>) {
    await next();
    const status = ctx.response.status;
    const url = decodeURI(ctx.request.url.pathname).replaceAll(" ", "%20");
    const logContent = `[${status}] ${ctx.request.method} ${url} from ${ctx.request.ip}`;
    if (status === 200)
        if (ctx.request.url.pathname.startsWith("/static/"))
            console.log(gray(logContent));
        else
            console.log(green(logContent));
    else if (status === 401) {
        console.log(red(logContent));
        const password = ctx.request.headers.get("Authorization");
        if (password) {
            console.log(red(`      with the password: "${password}".`));
        } else {
            console.log(red(`      without passing password.`));
        }
    }
    else if (status === 404)
        console.log(yellow(logContent));
}

export default logger;