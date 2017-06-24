/**
 * @file mock api router
 * @author fio <zhoufangxing@baidu.com>
 */

import Router from 'koa-router';
import fetch from 'node-fetch';

import mockup from './mockdata.js';

const mockRoute = new Router();

mockRoute.get('/api/education/home/recommend', ctx => {
    ctx.body = mockup.recommend;
});


/**
query {
    pageNo=1
    pageSize=15
    order='asc'
    orderby='time'
    keyword（可无）
    }
**/
mockRoute.get('/api/education/list/:cid', ctx => {
    ctx.body = mockup.list;
});


mockRoute.get('/api/education/category/:cid', ctx => {
    ctx.body = mockup.category;
});

mockRoute.put('/api/iot2/dm/v3/iot/test/:dd', ctx => {
    ctx.status = 400;
    ctx.body = {
        'code': 'CODE_NUMBER',
        'msg': 'ERR_MESSAGE'
    };
});




export default mockRoute;
