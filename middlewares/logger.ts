import { Context } from 'oak';
import { gray, green, red, reset, yellow } from '@std/fmt/colors';

async function logger(ctx: Context, next: () => Promise<unknown>) {
  await next();

  const status = ctx.response.status;
  const time = getTimeString();
  const method = ctx.request.method;
  const pathname = decodeURI(ctx.request.url.pathname);
  const ip = ctx.request.ip;

  const logContent = `[${status}] [${time}] ${method} "${pathname}" from ${ip}`;

  const [log, color] = ((): [string, (str: string) => string] => {
    if (status === 200) {
      return [
        logContent,
        pathname.startsWith('/static/') ? gray : green,
      ];
    } else if (status === 401) {
      const password = ctx.request.headers.get('Authorization');
      const description = password
        ? `with the password: "${password}"`
        : `without password`;
      return [`${logContent}, ${description}.`, red];
    } else if (status === 404) {
      return [logContent, yellow];
    } else {
      return [logContent, reset];
    }
  })();

  Deno.writeTextFile('./requests.log', `${log}\n`, { append: true });
  console.log(color(log));
}

function getTimeString(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export default logger;
