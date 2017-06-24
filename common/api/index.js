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

export function resetKey(name, ctxCookie = {}) {
    const url = getUrl(`${Api.accessDetail}/${name}?updateSecretKey`);
    return fetch(url, {method: 'put'}, ctxCookie);
}

export function userFirst(ctxCookie = {}) {
    const url = getUrl(`${Api.userFirst}?new`);
    return fetch(url, {method: 'get'}, ctxCookie);
}

