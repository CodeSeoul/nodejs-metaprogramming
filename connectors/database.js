'use strict';

import mysql2 from 'mysql2/promise';
import config from '../config/database.js';

class DatabaseWrapper {
    constructor() {
        /** @type {mysql2.Pool}  */
        this.pool = mysql2.createPool({
            ...config
        });
    }

    /**
     * @typedef DatabaseExecuteOptions
     */

    /**
     * Executes a one-off query using a connection from the pool. 
     * 
     * Do not use with transactions, as you cannot guarantee you'll
     * use the same connection.
     * @param {string} sql 
     * @param {Object|Array} params 
     * @param {DatabaseExecuteOptions} options 
     * @returns {Promise<{results: [Object], fields: [Object]}>}
     */
    async execute(sql, params = {}, options = {}) {
        let rows;
        let fields;
        
        try {
            if (options.parametersUseArrays) {
                [rows, fields] = await this.pool.query(
                    {
                        sql,
                        namedPlaceholders: true
                    },
                    params
                )
            } else {
                [rows, fields] = await this.pool.execute(
                    {
                        sql,
                        namedPlaceholders: true
                    },
                    params
                )
            }
        } catch(e) {
            throw e;
        }
        
        return {
            results: rows,
            fields
        };
    }

    /**
     * Gets a connection from the pool
     * @returns {DatabaseConnection}
     */
    async getConnection() {
        let connection;
        try {
            connection = await this.pool.getConnection();
        } catch(e) {
            throw e;
        }
        return new DatabaseConnection(connection);
    }
}

class DatabaseConnection {
    /**
     * @param {mysql2.PoolConnection}
     */
    constructor(connection) {
        this.connection = connection;
    }

    async startTransaction() {
        return this.connection.query('start transaction');
    }

    async rollbackTransaction() {
        return this.connection.query('rollback');
    }

    async commitTransaction() {
        return this.connection.query('commit');
    }

    /**
     * Executes a query using a dedicated connection from the pool.
     * @param {string} sql 
     * @param {Object|Array} params 
     * @param {DatabaseExecuteOptions} options 
     * @returns {Promise<{results: [Object], fields: [Object]}>}
     */
    async execute(sql, params = {}, options = {}) {
        let rows;
        let fields;
        
        try {
            if (options.parametersUseArrays) {
                [rows, fields] = await this.connection.query(
                    {
                        sql,
                        namedPlaceholders: true
                    },
                    params
                )
            } else {
                [rows, fields] = await this.connection.execute(
                    {
                        sql,
                        namedPlaceholders: true
                    },
                    params
                )
            }
        } catch(e) {
            throw e;
        }
        
        return {
            results: rows,
            fields
        };
    }

    release() {
        this.connection.release();
    }
}

export default new DatabaseWrapper();
