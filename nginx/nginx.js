const koa = require('koa');
const app = new koa();
const fs = require('fs');
const Router = require('koa-router');
const router = new Router();


app.use((ctx, next) => {
    if (ctx.method === 'OPTIONS') {
        ctx.body = '';
    }
    next();
});

router.get('/', async (ctx, next) => {
    const html = fs.readFileSync('./nginx.html', 'utf-8');
    ctx.body = html;
})

router.get('/getData', async (ctx, next) => {
    ctx.body = 'success';
})

app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');