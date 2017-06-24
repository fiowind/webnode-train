/**
 * @file action
 * @author fio
 * @crete 2017/5/30
 */

import * as ActionTypes from '../constants/ActionTypes';
import * as api from '../api/index';

function handleError(err, dispatch) {
    dispatch(ajaxFail(err));
    return Promise.reject(err);
}

function handleSuccess(data, dispatch, actionType) {
    dispatch({
        type: actionType,
        data
    });
    dispatch(ajaxSuccess());
    return data;
}

export function leavePage() {
    return function (dispatch) {
        dispatch({
            type: ActionTypes.GET_PAGE_LEAVE
        });
    };
}

export function getHomeData({ctxCookie}) {
    return function (dispatch) {
        dispatch(ajaxLoad());
        return api.getHomeRecommend(ctxCookie).then(data => {
            return handleSuccess(data, dispatch,
        ActionTypes.GET_RECOMMEND_DATA);
        }).catch(err => {
            return handleError(err, dispatch);
        });
    };
}

export function getListData({cid, query, ctxCookie}) {
    return function (dispatch) {
        dispatch(ajaxLoad());
        return api.getList(cid, query, ctxCookie).then(data => {
            return handleSuccess(data, dispatch,
        ActionTypes.GET_LIST_DATA);
        }).catch(err => {
            return handleError(err, dispatch);
        });
    };
}

export function getListCategory({cid, ctxCookie}) {
    return function (dispatch) {
        dispatch(ajaxLoad());
        return api.getListCategory(cid, ctxCookie).then(data => {
            return handleSuccess(data, dispatch,
        ActionTypes.GET_CATEGORY_DATA);
        }).catch(err => {
            return handleError(err, dispatch);
        });
    };
}

// prod
export function ajaxLoad() {
    return {
        type: ActionTypes.AJAX_LOADING
    };
}

export function ajaxSuccess() {
    return {
        type: ActionTypes.AJAX_SUCCESS
    };
}

export function ajaxFail(data) {
    return {
        type: ActionTypes.AJAX_FAIL,
        data
    };
}
export function resetaddState() {
    return {
        type: ActionTypes.RESET_ADD_STATE
    };
}

export function resetAjaxState() {
    return {
        type: ActionTypes.RESET_AJAX_STATE
    };
}
