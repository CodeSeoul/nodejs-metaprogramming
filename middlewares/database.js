'use strict';

import DatabaseWrapper from '../connectors/database.js';
import * as Koa from 'koa';

/**
 * 
 * @param {Koa.Context} ctx 
 * @param {Koa.Next} next 
 */
async function middleware(ctx, next) {
    try {
        /** @type {DatabaseConnection} ctx.db */
        ctx.db = DatabaseWrapper.getConnection();
    } catch(e) {
        ctx.throw(e);
    }

    try {
        await ctx.db.startTransaction();
    } catch(e) {
        ctx.db.release();
        ctx.throw(e);
    }

    try {
        await next();
    } catch(e) {
        await ctx.db.rollbackTransaction();
        ctx.db.release();
        ctx.throw(e);
    }

    try {
        await ctx.db.commitTransaction();
    } catch(e) {
        await ctx.db.rollbackTransaction();
        ctx.throw(e);
    } finally {
        ctx.db.release();
    }
}

export default () => {
    return middleware;
};
