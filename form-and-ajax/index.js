const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const router = new Router();


router.post('/form', async (ctx) => {
    console.log(ctx.req.body);
    ctx.body = {
        success: true
    };
})

app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');