/**
 * @file reducer
 * @author fio
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as ActionTypes from '../constants/ActionTypes';

export const defaultInitState = {
    data: null,
    loadover: false
};

export const defaultInitAjaxState = {
    ajaxFail: false,
    ajaxFailedMessage: ''
};

const recommend = (state = defaultInitState, action) => {
    switch (action.type) {
        case ActionTypes.GET_RECOMMEND_DATA:
            return Object.assign({}, state, {data: action.data, loadover: true});
        case ActionTypes.GET_PAGE_LEAVE:
            return Object.assign({}, state, {loadover: false});
        default:
            return state;
    }
};

const appState = (state = defaultInitAjaxState, action) => {
    switch (action.type) {
        case ActionTypes.AJAX_FAIL:
            return Object.assign({}, state, {
                ajaxFail: true && action.data,
                ajaxFailedMessage: action.data
            });
        case ActionTypes.AJAX_SUCCESS:
            return Object.assign({}, state, {
                ajaxFail: false,
                ajaxFailedMessage: ''
            });
        case ActionTypes.RESET_AJAX_STATE:
            return Object.assign({}, state, {
                ajaxFail: false,
                ajaxFailedMessage: ''
            });
        default:
            return state;
    }
};


export default combineReducers({
    routing: routerReducer,
    recommend,
    appState
});
