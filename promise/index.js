const Koa = require('koa');
const app = new Koa();

const cors = require('koa-cors');
const Router = require('koa-router');
const router = new Router();


router.get('/promise', async (ctx, next) => {
  await new Promise(function(resolve){
    setTimeout(function(){
        resolve();
    },2000);
  })
  ctx.body = {
      success: true
  };
})
app.use(cors());
app.use(router.routes());
app.listen(8002, () => {
  console.log('koa app listening at 8001')
});