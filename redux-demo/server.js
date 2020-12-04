const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const router = new Router();

const whiteList = ['http://localhost:8000'];

app.use((ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
  }
  next();
});

app.use((ctx, next) => {
  let origin = ctx.headers.origin;
  console.log(origin);
  // if (whiteList.includes(origin)) {//如果判断是否存在，不建议使用indexOf
  ctx.set('Access-Control-Allow-Origin', origin);
  ctx.set(
    'Access-Control-Allow-Headers',
    'name,Authorization,x-requested-with'
  );
  ctx.set('Access-Control-Allow-Methods', 'GET');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Max-Age', 60);
  //新增的部分
  ctx.set('Access-Control-Expose-Headers', 'response');
  //
  // }
  next();
});

router.get('/list', async (ctx, next) => {
  ctx.body = {
    success: true,
    data: [
      {
        name: 1
      },
      {
        name: 2
      }
    ]
  };
});
app.use(router.routes());

app.listen(3002);
console.log('koa server is listening port 3000');
