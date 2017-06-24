/**
 * @file configStore
 * @author fio
 */
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {getHTMLTitle, resetAPPHeader} from '../utils/iotUtils';
import {isBrowser, captureException} from '../utils/commonUtils';
import {defaultTitle} from '../config';
import rootReducer from '../reducers/index';

function callTraceMiddleware({getState}) {
    return next => action => {
        // TODO : check store.router.path and store data, to get HTML title
        if (isBrowser()) {
            const store = getState();
            let header = defaultTitle;
            try {
                header = getHTMLTitle(window.location.pathname, store);
            } catch (e) {
                captureException(e);
            }
            resetAPPHeader(header);
        }
        return next(action);
    };
}

export default function configStore(initState, extraArgs) {
    return createStore(rootReducer, initState,
                        applyMiddleware(callTraceMiddleware, thunkMiddleware.withExtraArgument(extraArgs)));
}
