/**
 * @file tools/BusinessException.js BusinessException
 * @author fio
 */
import {errorInternalServerError} from './status';

export class BusinessException extends Error {
    constructor() {
        super();
        this.body = statusCode || {};
        if (message) {
            this.body.message = message;
        }
    }
}

export async function catchGlobalError(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        if (err instanceof BusinessException) {
            ctx.status = 400;
            ctx.body = err.body;
        }
        else {
            const errId = ctx.request.reqId || uuid();
            ctx.status = 500;
            ctx.body = errorInternalServerError(errId);
            ctx.app.emit('error', err, errId);
        }
    }
}