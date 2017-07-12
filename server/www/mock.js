/**
 * @file mock api router
 * @author fio <zhoufangxing@baidu.com>
 */

import Router from 'koa-router';
import fetch from 'node-fetch';

import mockup from './mockdata.js';
import Knex from 'knex';

const mockRoute = new Router();

const mysql = Knex({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'rqz'
  }
});

mockRoute.get('/api/education/home/recommend', ctx => {
    ctx.body = mockup.recommend;
});


mockRoute.get('/api/a/test', async ctx => {
    var data = await mysql('mvp_rqz_list');
    ctx.body = data;
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

mockRoute.get('/api/demo/:title', ctx => {
    console.log(ctx.params);
    var randomNum = Math.random()*5;
    ctx.body = {
        'title': ctx.params.title,
        'content': `${ctx.params.title},mycontenta,${new Date().toString()}`,
        'score': parseInt(randomNum, 10)
    };
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
