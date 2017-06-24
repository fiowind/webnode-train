/**
 * @file common/util/LocalUtils.js 业务相关公共代码封装
 * @author fio
 */


import {defaultTitle} from '../config';
import {isBrowser} from './commonUtils';

export function getHTMLTitle(path, store) {
    if (path.match(/\/list\/\S+$/)) {
        return defaultTitle;
    }
    if (
        path.match(/\/detail\/\S+$/)
        && store && store.productDetail
        && store.productDetail.data
        && store.productDetail.data.productInfo
    ) {
        const title = store.productDetail.data.productInfo.title;
        const description = store.productDetail.data.productInfo.digest;
        return `${title}-${description}`;
    }

    return defaultTitle;
}

export function searchToQuery(search) {
    let query = {};
    if (search[0] !== '?') {
        return query;
    }
    search.substring(1).split('&').map(item => {
        if(item !== '') {
            let result = item.split('=');
            query[result[0]] = result[1];
        }
    })
    return query;
}

export function resetAPPHeader(title) {
    if (isBrowser()) {
        window.document.title = title;
    }
}

export function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
