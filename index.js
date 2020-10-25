'use strict';

import Koa from 'koa';
const app = new Koa();

import bodyParser from 'koa-bodyparser';
import router from './routes/index.js';
import databaseMiddleware from './middlewares/database.js';

import swaggerUiPkg from 'koa2-swagger-ui';
const { koaSwagger } = swaggerUiPkg;

app.use(bodyParser());
app.use(databaseMiddleware());
app.use(router.middleware());
app.use(koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        // You'd want to change this in a real application
        url: 'http://localhost:3000/_api.json'
    }
}));

app.listen(3000);
