/**
 * @file server/serverRender.js 服务端静态代码渲染
 * @author fio
 */

import Router from 'koa-router';
import {match} from 'react-router';
import configGet from 'config';

import {routes as feRoutes} from '../../common/routes/routing';
import * as config from '../../common/config';
import configStore from '../../common/store/configStore';
import {read} from '../../common/utils/fetchComponentData';
import {defaultInitState} from '../../common/reducers';


const serverRenderRouter = new Router();
global.web_api_internal_url = configGet.get('apiUrl');

serverRenderRouter.get('*', async (ctx, next) => {
    let theError;
    let theRenderProps;
    let theRedirectLocation;
    // sync function
    match({
        routes: feRoutes,
        location: ctx.originalUrl.replace(config.appDomain, '') || '/'
    }, (error, redirectLocation, renderProps) => {
        if (error) {
            global.logger.info('Got render error ', error);
            theError = error;
        }
        else if (redirectLocation) {
            return ctx.redirect(redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {
            theRenderProps = renderProps;
            theRedirectLocation = redirectLocation;
        }
    });

    if (theError) {
        ctx.throw(theError.message, 500);
    }
    else if (!theRenderProps) {
        await next();
    }
    else {
        const store = configStore({
            mktHome: {...defaultInitState, isFirstEnter: ctx.query.isFirstEnter === '1'}
        }, {ctxCookie: ctx.header.cookie});

        ctx.type = 'text/html';
        ctx.body = await read(store, theRedirectLocation, theRenderProps, ctx);
    }
});

export default serverRenderRouter;
