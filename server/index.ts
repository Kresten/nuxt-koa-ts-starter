import Koa from 'koa';
import helmet from 'koa-helmet';
// @ts-ignore
import { Builder, Nuxt } from 'nuxt';
import { config } from '../nuxt.config';
import { router } from './routes/index';
import { koaPino, getLogger } from './util/logger';

const logger = getLogger('server/index.ts');

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(helmet());
app.use(koaPino);
// Import and Set Nuxt.js options
config.dev = app.env !== 'production';

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT || 3000 } = nuxt.options.server;

  await nuxt.ready();
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    (ctx.req as any).ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  logger.info(`Server listening on http://${host}:${port}`);
}
start();
