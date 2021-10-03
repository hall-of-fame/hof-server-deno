import { exists } from "https://deno.land/std@0.107.0/fs/mod.ts";

// deno-lint-ignore no-explicit-any
const config: Record<string, any> = {};

if (await exists("./config/public.json")) {
    const publicData = await Deno.readTextFile("./config/public.json");
    const publicConfig = JSON.parse(publicData);
    Object.assign(config, publicConfig)
}

if (await exists("./config/private.json")) {
    const privateData = await Deno.readTextFile("./config/private.json");
    const privateConfig = JSON.parse(privateData);
    Object.assign(config, privateConfig)
}

export const port: number = config.port;
export const hostname: string = config.hostname;
export const popular: Array<{
    author: string,
    desc: string,
    url: string
}> = config.popular ?? [];
export const avatar: Record<string, string> = config.avatar ?? {};
export const password: string | undefined = config.password;
export const secure: boolean = config.secure;

