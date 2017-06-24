/**
 * @file server/index.js 服务启动文件
 * @author fio
 */

import compose from 'koa-compose';
import uuid from 'node-uuid';

async function logger(ctx, next) {
    ctx.request.reqId = uuid();
    const referer = (ctx.get('referer') || ctx.get('referrer') || '').slice(0, 768);
    const userAgent = (ctx.get('user-agent') || '').slice(0, 384);
    global.logger.info('%s %s - %s', ctx.method, ctx.url, ctx.request.body);
    await next();

    if (ctx.method !== 'HEAD') {
        global.logger.info('%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s',
                            ctx.ip, ctx.headers.REMOTE_USER || '-', Date.now(),
                            ctx.request.href || '-',
                            ctx.status,
                            ctx.response.length, referer || '-', userAgent || '-',
                            ctx.url);
    }
}

export default compose([logger]);
