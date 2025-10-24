import { exists } from "@std/fs";

type Config = {
    host: string;
    port: number;
    /**
     * If this option is set to `true`, the server will provide a secure
     * connection, and try to find the certificate and private key in
     * `./config/tls/full_chain.pem` and `./config/tls/private.key`.
     */
    secure: boolean;
    /**
     * If this option is specified, the request needs the `Authorization`
     * in the headers. And if the value doesn't match the `password`,
     * the server will respond with the status code 401.
     */
    password?: string;
    /**
     * @deprecated
     * This item's value will be responded when `GET /popular` is
     * requested.
     */
    popular: Array<{
        author: string;
        desc: string;
        url: string;
    }>;
    /**
     * It's a map of the username to its corresponding QQ id. So the
     * client will then get the avatar url by the QQ id.
     */
    avatars: Record<string, string>;
};

async function getConfig(): Promise<Partial<Config>> {
    if (await exists("./config.json")) {
        const configText = await Deno.readTextFile("./config.json");
        const config = JSON.parse(configText);
        return config;
    } else {
        return {};
    }
}

const config = await getConfig();

export const host: string = config.host ?? "127.0.0.1";
export const port: number = config.port ?? 8000;
/** @deprecated */
export const popular: Array<{
    author: string;
    desc: string;
    url: string;
}> = config.popular ?? [];
export const avatars: Record<string, number | string> = config.avatars ?? {};
export const password: string | undefined = config.password;
export const secure: boolean = config.secure ?? false;
