'use strict';

import joiRouter from 'koa-joi-router';
// Import the controllers and models we created
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
      // This data will show up in Swagger
      summary: "Get a list of books",
      description: "Returns a list of books with data",
      // The tags are used for categorizing endpoints
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
        // ref is used by Swagger to reference a model
        // rather than repeat its definition
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
    // In this case, we're validating input in addition
    // to output
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
  // Remember how tags categorize the endpoints?
  tags: [{
    name: 'books',
    description: `A Book.`
  }],
  // Listing our models here allows us to use "ref" like above
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
    201: {
      description: 'CREATED'
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

export default router;
