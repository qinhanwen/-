const koa = require('koa');
const app = new koa();
const createApp = require('./app');

const Router = require('koa-router');
const router = new Router();
const renderer = require('vue-server-renderer').createRenderer()

router.get('/index', async (ctx, next) => {
    const app = createApp(ctx);

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        ctx.body = `
          <!DOCTYPE html>
          <html lang="en">
            <head><title>Hello</title></head>
            <body>${html}</body>
          </html>
        `
    })
})

app.use(router.routes());

app.listen(3000);
console.log('koa server is listening port 3000');