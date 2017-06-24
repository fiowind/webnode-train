/**
 * @file routing
 * @author fio
 * @crete 2017/4/13
 */

import App from '../container/App';
import Home from '../container/Home';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') {
    require.ensure = (d, c) => c(require);
}

export const routes = {
    path: '/',
    component: App,
    getIndexRoute(partialNextState, callback) {
        require.ensure([], require => {
            callback(null, {
                component: Home
            });
        });
    }
};
