'use strict';

import mysql2 from 'mysql2/promise';
import config from '../config/database.js';

/**
 * Wrapper for our database in case we want to change database engines
 */
class DatabaseWrapper {
  /**
   * Creates the database wrapper
   */
  constructor() {
    /** @type {mysql2.Pool}  */
    this.pool = mysql2.createPool(config);
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
   * @return {Promise<{results: [Object], fields: [Object]}>}
   */
  async execute(sql, params = {}, options = {}) {
    let rows;
    let fields;

    if (options.parametersUseArrays) {
      [rows, fields] = await this.pool.query(
          {
            sql,
            namedPlaceholders: true,
          },
          params,
      );
    } else {
      [rows, fields] = await this.pool.execute(
          {
            sql,
            namedPlaceholders: true,
          },
          params,
      );
    }

    return {
      results: rows,
      fields,
    };
  }

  /**
   * Gets a connection from the pool
   * @return {DatabaseConnection}
   */
  async getConnection() {
    const connection = await this.pool.getConnection();
    return new DatabaseConnection(connection);
  }
}

/**
 * An individual connection to the database taken from the pool
 */
class DatabaseConnection {
  /**
   * @param {mysql2.PoolConnection} connection
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Start a database transaction
   */
  async startTransaction() {
    return this.connection.query('start transaction');
  }

  /**
   * Rollback the pending database transaction
   */
  async rollbackTransaction() {
    return this.connection.query('rollback');
  }

  /**
   * Commit the pending database transaction
   */
  async commitTransaction() {
    return this.connection.query('commit');
  }

  /**
   * Executes a query using a dedicated connection from the pool.
   * @param {string} sql
   * @param {Object|Array} params
   * @param {DatabaseExecuteOptions} options
   * @return {Promise<{results: [Object], fields: [Object]}>}
   */
  async execute(sql, params = {}, options = {}) {
    let rows;
    let fields;

    if (options.parametersUseArrays) {
      [rows, fields] = await this.connection.query(
          {
            sql,
            namedPlaceholders: true,
          },
          params,
      );
    } else {
      [rows, fields] = await this.connection.execute(
          {
            sql,
            namedPlaceholders: true,
          },
          params,
      );
    }

    return {
      results: rows,
      fields,
    };
  }

  /**
   * Release the database connection back to the pool
   */
  release() {
    this.connection.release();
  }
}

export default new DatabaseWrapper();
