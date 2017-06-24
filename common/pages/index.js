/**
 * @file page index
 * @author fio
 */
import React from 'react';
import configStore from '../store/configStore';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createHistory} from 'history';
import {routes} from '../routes/routing';
import {useRouterHistory, Router, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {isBrowser} from '../utils/commonUtils';
import {appDomain} from '../config';
import 'normalize.css';
import '../assets/css/global.css';
import '../assets/css/extend.css';


const browserHistory = useRouterHistory(createHistory)({
    basename: appDomain
});

const store = configStore(isBrowser() ? window.__INITIAL_STATE__ : {});
const history = syncHistoryWithStore(browserHistory, store);

match({routes, location}, () => {
    render(
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>,
    document.querySelector('.container')
  );
});
