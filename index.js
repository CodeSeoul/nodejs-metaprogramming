'use strict';

import Koa from 'koa';
const app = new Koa();

import bodyParser from 'koa-bodyparser';
import router from './routes/index.js';

// Import the UI package to get our pretty swagger UI
import swaggerUiPkg from 'koa2-swagger-ui';
// We're using ES Modules, but this is written as CommonJS
// So we need to import it first, then pull out the SwaggerAPI
// class from it.
const { koaSwagger } = swaggerUiPkg;

app.use(bodyParser());
app.use(router.middleware());
app.use(koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        // You'd want to change this in a real application
        url: 'http://localhost:3000/_api.json'
    }
}));

app.listen(3000);
