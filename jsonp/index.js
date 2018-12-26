const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const router = new Router();

router.get('/jsonp', async (ctx, next) => {
    const req = ctx.request.query;
    console.log(req);
    const data = '这个是数据';
    ctx.body = req.cb + '(' + JSON.stringify(data) + ')';
})





app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');