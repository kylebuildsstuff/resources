// Koa middleware cascade in a more traditional way
// as you may be used to with similar tools - this was
// previously difficult to make user friendly with node's use of
// callbacks. However with async functions we can achieve "true"
// middleware. Contrasting Connect's implementation which simply passes
// control through series of functions until one returns, Koa invoke
// "downstream", then control flows back "upstream".
//
// The following example responds with "Hello World",
// however first the request flows through the x-response-time
// and logging middleware to mark when the request started, then
// continue to yield control through the response middleware.
// When a middleware invokes next() the function suspends and
// passes control to the next middleware defined. After there
// are no more middleware to execute downstream, the stack
// will unwind and each middleware is resumed to perform its
// upstream behaviour.

const Koa = require('koa');
const app = new Koa();

// >> console.dir(app);

// Application {
//   domain: null,
//   _events: {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   proxy: false,
//   middleware: [],
//   subdomainOffset: 2,
//   env: 'development',
//   context: {},
//   request: {},
//   response: {} }

// x-response-time
app.use(async (context, next) => {
  console.log('0.1');
  const start = Date.now();
  let what = await next();
  const ms = Date.now() - start;
  console.log('first: ', ms, what);
  context.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (context, next) => {
  console.log('0.2');
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('second: ', ms);
  console.log(`${context.method} ${context.url} - ${ms}`);
  return 'sup'
});

// response
app.use(async context => {
  context.body = 'Hello World';
});

app.listen(3000);

// 0.1
// 0.2
// second:  2
// GET / - 2
// first:  3 sup
