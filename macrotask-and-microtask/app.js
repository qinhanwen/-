const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const router = new Router();


const whiteList = ['http://localhost:8001'];

app.use(async (ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        ctx.body = '';
    }
    await next();
});

app.use(async (ctx, next) => {
    let origin = ctx.headers.origin;
    if (whiteList.includes(origin)) {//如果判断是否存在，不建议使用indexOf
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Headers', "name,age");
        ctx.set('Access-Control-Allow-Methods', "PUT");
        ctx.set('Access-Control-Allow-Credentials', true);
        ctx.set('Access-Control-Max-Age', 60);
        //新增的部分
        ctx.set('Access-Control-Expose-Headers', 'response');
        //
    }
   await next();
})


 router.get('/test', async (ctx, next) => {
   await new Promise(resolve => {
        setTimeout(function () {
            resolve('data');
        }, 5000);
    })
    ctx.body ={
        success:true
    }
})

app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');