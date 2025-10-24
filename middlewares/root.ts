import { ErrorStatus, HttpError, send, Status } from 'oak';
import { Context } from 'oak';

async function root(ctx: Context, next: () => Promise<unknown>) {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Authorization');
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200;
    return;
  }

  if (ctx.request.url.pathname.startsWith('/static/')) {
    await handleStaticRequest(ctx);
  } else {
    await next();
    if (ctx.response.status === 200) {
      ctx.response.body = {
        data: ctx.response.body,
      };
    }
  }
}

async function handleStaticRequest(ctx: Context) {
  // In case of NotFoundError
  try {
    await send(ctx, ctx.request.url.pathname.slice(8), {
      root: `${Deno.cwd()}/static/`,
    });
  } catch (e) {
    const err = e as HttpError<ErrorStatus>;
    if (err.status === Status.NotFound) {
      // Do nothing here because the logger middleware will show the warning message.
    }
  }
}

export default root;
