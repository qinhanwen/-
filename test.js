const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
const router = new Router();
const ejs = require('ejs');
const views = require('koa-views');
const path = require('path');



router.get('/index',async (ctx) => {
    var url = decodeURIComponent(ctx.request.url);
    var str = url.substr(url.indexOf('?')+1);
    await ctx.render('index',{content: str});
})

app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');