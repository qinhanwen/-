const Koa = require('koa');
const app = new Koa();

const path = require('path');
const cors = require('koa-cors');
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');


router.post('/error', async (ctx, next) => {
  const body = ctx.request.body;
  console.log(body);
  ctx.body = {
      success: true
  };
})
app.use(cors());
app.use(require('koa-static')(path.resolve(__dirname, './public')));
app.use(koaBody());
app.use(router.routes());
app.listen(8001, () => {
  console.log('koa app listening at 8001')
});