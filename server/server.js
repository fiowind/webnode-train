/**
 * @file server/server.js 服务启动文件
 * @author fio
 */

import path from 'path';
import Koa from 'koa';
import mount from 'koa-mount';
import gzip from 'koa-gzip';
import serve from 'koa-static';
import favicon from 'koa-favicon';
import util from 'util';

import * as status from './tools/status';
import * as config from '../common/config.js';

// init pre-router and middleware
import serverRender from './tools/serverRender';
import middleware from './middleware/middleware';
import mockRoute from './www/mock';
import initAllLogger from './tools/logger';
import {BusinessException, catchGlobalError} from './tools/exception';

var cors = require('koa-cors');


const logPath = path.join(__dirname, '../../logs/');
initAllLogger(logPath, global);
const app = new Koa();

app.proxy = true;
app.use(cors());
app.use(gzip());
app.use(favicon(path.join(__dirname, '../client/favicon.ico')));


util.inherits(BusinessException, Error);
global.BusinessException = BusinessException;


// 穿透cloud.baidu.com/market代理的静态文件，防止404，如cloud.baidu.com/market/version.txt等
app.use(mount(config.appDomain || '/', serve(path.join(__dirname, '/../client/assets'))));
app.use(mount(config.appDomain || '/', serve(path.join(__dirname, '/../dist'))));

app.on('error', (err, errId) => {
    global.logger.error('Error: %j - %s - %s ', util.inspect(err), errId, err.stack);
});

app.use(middleware);
app.use(catchGlobalError);

app.use(mockRoute.routes());
app.use(serverRender.routes());

app.use(ctx => {
    ctx.status = 404;
    ctx.body = 'Not Found';
});

const PORT = process.env.NODE_PORT || 8103;
app.listen(PORT, () => global.logger.info('Listening on port %s', PORT));
