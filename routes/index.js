'use strict';

import joiRouter from 'koa-joi-router';
import { getBookList, createBook } from '../controllers/books.js';
import { BookModel, NewBookModel, BookModelList } from '../models/books.js';

// Import our documentation library
import koaJoiRouterDocs from 'koa-joi-router-docs';
// We're using ES Modules, but this is written as CommonJS
// So we need to import it first, then pull out the SwaggerAPI
// class from it.
const { SwaggerAPI } = koaJoiRouterDocs;

const Joi = joiRouter.Joi;
const router = joiRouter();

// This is a router similar to before, but now 
// we're adding the "meta" value to the route object.

router.route({
  meta: {
    swagger: {
      summary: "Get a list of books",
      description: "Returns a list of books with data",
      tags: ["books"]
    }
  },
  method: 'get',
  path: '/books',
  query: Joi.object({
    page: Joi.number().integer()
  }),
  validate: {
    output: {
      200: {
        body: BookModelList,
        ref: "#/definitions/BookList"
      }
    },
  },
  handler: getBookList

});

router.route({
  meta: {
    swagger: {
      summary: "Create a new book",
      description: "Creates a new book",
      tags: ["books"]
    }
  },
  method: 'post',
  path: '/books',
  validate: {
    type: 'json',
    body: NewBookModel,
    ref: '#/definitions/NewBook',
    output: {
      201: {
        body: BookModel,
        ref: "#/definitions/Book"
      }
    },
  },
  handler: createBook
});

/**
 * Generate Swagger json from the router object
 */
const generator = new SwaggerAPI();
generator.addJoiRouter(router);

const spec = generator.generateSpec({
  info: {
    title: 'Example API',
    description: 'API for creating and editing examples.',
    version: '1.1'
  },
  basePath: '/',
  tags: [{
    name: 'books',
    description: `A Book.`
  }],
  // pass `definitions` if you need schema references
  definitions: {
    BookList: BookModelList,
    NewBook: NewBookModel,
    Book: BookModel
  },
}, {
  defaultResponses: {
    200: {
      description: 'OK'
    },
    500: {
      description: 'ERROR'
    }
  } // Custom default responses if you don't like default 200
})

/**
 * Swagger JSON API
 */
router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ');
});

// Anything other than the above method/path combinations will produce an error.

// Now that we've defined our routes, lets export our router object for use
// in our index.js as a middleware.
export default router;
