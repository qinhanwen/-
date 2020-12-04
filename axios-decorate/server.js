const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const cors = require('koa-cors');
const router = new Router();

app.use(cors());

router.get('/list', async (ctx, next) => {
  await new Promise(resolve => {
    setTimeout(resolve, 4000);
  });
  ctx.body = {
    success: true
  };
});

app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');
