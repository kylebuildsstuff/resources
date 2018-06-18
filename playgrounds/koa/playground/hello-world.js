const Koa = require('koa');

const app = new Koa();

app.use(async context => {
  context.body = 'Hello World';
});

app.listen(3000);
