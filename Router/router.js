const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const json = require('koa-json');
const { AutoVote } = require('../controller/vote');

const app = new Koa();
const router = new Router();

app.use(json());
app.use(logger());
app.use(router.routes())
   .use(router.allowedMethods());

router.post('/AutoVote', koaBody({multipart: true}), AutoVote);

module.exports = app;