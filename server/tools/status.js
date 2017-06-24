/**
 * @file server/status.js API句柄封装
 * @author fio
 */
exports.success = function (body) {
    return {
        status: 200,
        success: true,
        result: body || {}
    };
};

exports.errorInvalidParameter = function () {
    return {
        status: 1005,
        success: false,
        result: 'invalid parameter'
    };
};

exports.errorWithEmpty = function () {
    return {
        status: 200,
        success: false,
        result: 'Empty data'
    };
};

exports.errorWithBackendErrorCode = function (errorcode, body) {
    return {
        status: errorcode,
        success: false,
        result: body || 'backend error code'
    };
};

exports.errorInternalServerError = function (errid) {
    return {
        success: false,
        message: 'internal server error',
        uuid: errid
    };
};
