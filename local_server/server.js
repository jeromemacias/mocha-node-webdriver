import Koa from 'koa';
import koaRouter from 'koa-router';

const app = new Koa();
const router = new koaRouter();

router.get('/hello', (ctx) => {
    ctx.body = 'world';
});
router.get('/echo/:echo', (ctx) => {
    ctx.body = 'your query was:  ' + ctx.params.echo;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) {
    app.listen(3030);
    console.log('Express server listening on port 3030');
}
