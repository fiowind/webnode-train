/**
 * @file 拉数据
 * @author fio
 * @crete 2017/4/12
 */

import React from 'react';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import util from 'util';

import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {RouterContext} from 'react-router';
import {getHTMLTitle} from '../utils/iotUtils';

export function fetchComponentData(dispatch, getState, components, params, query, cookieText) {
    global.logger.debug('Will fetchComponentData');

    /* eslint-disable */
    const needs = components.reduce((prev, current) => {
        return Object.keys(current || {}).reduce((acc, key) => {
            return current[key].hasOwnProperty('dataRequired') ? current[key].dataRequired.concat(acc) : acc;
        }, prev);
    }, []);
    /* eslint-enable */

    params.query = query;
    params.ctxCookie = cookieText;

    const promises = needs.map(need => dispatch(need(params, getState)));
    global.logger.info('[webnode] Promises length: %j', promises.length);

    return Promise.all(promises).catch(
        err => {
            global.logger.error('[webnode api] Cannot get server-render data in fetchComponentData: %j', err, err.stack);
            return Promise.reject(err);
        }
    );
}

export function read(store, redirectLocation, renderProps, ctx) {
    return new Promise((resolve, reject) => {
        const search = renderProps.location.search
            || (ctx.header['x-query-string'] ? `?${ctx.header['x-query-string']}` : '');

        fetchComponentData(
            store.dispatch, store.getState, renderProps.components,
            renderProps.params, search, ctx.header.cookie
        ).then(() => {
            global.logger.debug('fetched fetchComponentData');

            let initView;
            try {
                initView = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
            }
            catch (err) {
                global.logger.error('Error: %j - %s - %s ', util.inspect(err), err.stack);
                reject(err);
            }

            let state;
            try {
                state = JSON.stringify(store.getState());
            }
            catch (err) {
                global.logger.error('Error:state', err);
            }

            fs.readFile(path.join(__dirname, '../../views/index.mobile.ejs'), 'utf-8', (err, tmpl) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(ejs.render(tmpl, {
                        title: getHTMLTitle(ctx.path, store.getState()),
                        initialState: state,
                        html: initView
                    }));
                }
            });
        },
        err => {
            if (err.status === 404) {
                ctx.redirect('/404');
            }
            global.logger.error('[webnode] Cannot get server-render data in fetchComponentData: %j', err);
            fs.readFile(path.join(__dirname, '../../views/index.mobile.ejs'), 'utf-8', (readErr, tmpl) => {
                if (readErr) {
                    reject(readErr);
                }
                else {
                    resolve(ejs.render(tmpl, {
                        title: getHTMLTitle(ctx.path),
                        initialState: JSON.stringify({}),
                        html: ''
                    }));
                }
            });
        });
    });
}
