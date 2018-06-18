const Koa = require('koa');
const path = require('path');
const serve = require('koa-static-server');

const app = new Koa();

app.use(serve({ rootDir: path.join(__dirname, '../build') }));

const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`Listening on ${PORT}`);
