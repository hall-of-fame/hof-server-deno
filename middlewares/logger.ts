import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { gray, green, red, yellow } from "https://deno.land/std@0.109.0/fmt/colors.ts";

async function logger(ctx: Context, next: () => Promise<unknown>) {
    await next();

    const status = ctx.response.status;
    const time = getTimeString();
    const method = ctx.request.method;
    const pathname = decodeURI(ctx.request.url.pathname);
    const ip = ctx.request.ip;

    const logContent = `[${status}] [${time}] ${method} "${pathname}" from ${ip}`;
    Deno.writeTextFile("./requests.log", `${logContent}\n`, { append: true });

    if (status === 200)
        if (pathname.startsWith("/static/"))
            console.log(gray(logContent));
        else
            console.log(green(logContent));
    else if (status === 401) {
        const password = ctx.request.headers.get("Authorization");
        const description = password ?
            `with the password: "${password}"` :
            `without password`;
        console.log(red(`${logContent}, ${description}.`));
    }
    else if (status === 404)
        console.log(yellow(logContent));
    else
        console.log(logContent);
}


function getTimeString(): string {
    const date = new Date();
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const h = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export default logger;