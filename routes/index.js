'use strict';

import joiRouter from 'koa-joi-router';
import { getBookList, createBook } from '../controllers/books.js';
import { BookModel, NewBookModel, BookModelList } from '../models/books.js';

import koaJoiRouterDocs from 'koa-joi-router-docs';
const { SwaggerAPI } = koaJoiRouterDocs;

const Joi = joiRouter.Joi;
const router = joiRouter();

// List books
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
  validate: {
    query: {
      page: Joi.number().integer().default(0),
      countPerPage: Joi.number().integer().default(20)
    },
    output: {
      200: {
        body: BookModelList,
        ref: "#/definitions/BookList"
      }
    },
  },
  handler: getBookList
});

// Create book
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
  }
})

router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ');
});

export default router;
