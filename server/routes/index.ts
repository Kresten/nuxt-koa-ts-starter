import Router from 'koa-router';
const router = new Router();

// Mock Users
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', ctx => {
  ctx.body = users;
});

router.all('/api', ctx => {
  ctx.body = 'Hello World!';
});

export { router };
