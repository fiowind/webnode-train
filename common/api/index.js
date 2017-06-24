/**
 * @file api
 * @author fio
 * @create 2017/4/13
 */

import _fetch from 'isomorphic-fetch';

import {Api} from '../constants/ApiUrl';
import {isBrowser} from '../utils/commonUtils';

const fetch = (url, option = {}, ctxCookie) => {
    const headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/json',
        'mode': 'cors'
    };
    if (!isBrowser() && ctxCookie) {
        headers.cookie = ctxCookie;
    }
    return _fetch(url, {
        credentials: 'include', headers, ...option
    })
    .then(res => {
        if (res.status !== 200) {
            return res.json().then(res => Promise.reject(res));
        }
        return res.json();
    });
};

function getUrl(url) {
    if (isBrowser()) {
        return url;
    } else {
        if (process.env.NODE_ENV === 'development') {
            return `http://127.0.0.1:8103${url}`;
        } else {
            return `${global.web_api_internal_url || 'http://127.0.0.1:8103'}${url}`;
        }
    }
}

export function getHomeRecommend(ctxCookie = {}) {
    const url = getUrl(`${Api.recommend}`);
    return fetch(url, {method: 'get'}, ctxCookie);
}

export function getListCategory(cid, ctxCookie = {}) {
    const url = getUrl(`${Api.category}/cid`);
    return fetch(url, {method: 'get'}, ctxCookie);
}

export function getList(cid, query, ctxCookie = {}) {
    const pageNo = query.pageNo || 1;
    const pageSize = query.pageSize || 15;
    const order = query.order || 'asc';
    const orderby = query.orderby || 'time';
    const keyword = query.keyword ? `&key=${query.keyword}` : '';
    const url = getUrl(`${Api.list}/${cid}?pageNo=${pageNo}&pageSize=${pageSize}&orderby=${orderby}${keyword}`);
    return fetch(url, {method: 'get'}, ctxCookie);
}

