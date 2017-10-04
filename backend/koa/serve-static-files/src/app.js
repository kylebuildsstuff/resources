const Koa = require('koa');
const path = require('path');
const send = require('koa-static-server');

const app = new Koa();

app.use(send({ rootDir: path.join(__dirname, '../build') }));

const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`Listening on ${PORT}`);
