const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const router = new Router();

const whiteList = ['http://192.168.0.102:8000'];

app.use((ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        ctx.body = '';
    }
    next();
});

app.use((ctx, next) => {
    let origin = ctx.headers.origin;
    if (whiteList.includes(origin)) {
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Credentials', true);
    }
    next();
})

router.get('/setCookie', async (ctx, next) => {
    ctx.cookies.set(
        'name', 'qinhanwen', {
            domain:'http://192.168.0.102:8000',
            maxAge: 2 * 60 * 60 * 1000,   // cookie有效时长
            expires: new Date('2019-06-15'), // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    );
    ctx.body = {
        success: true
    };
})

router.get('/getCookie', async (ctx, next) => {
    console.log(ctx.request.origin)
    let name = ctx.cookies.get('name')
    ctx.body = {
        name
    };
})

app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');