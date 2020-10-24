'use strict';

import joiRouter from 'koa-joi-router';
const Joi = joiRouter.Joi;

export const BookModel = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string()
});

export const BookModelList = Joi.object({
    books: Joi.array().items(BookModel),
    _links: Joi.object({
        self: {
            href: Joi.string().only("/books")
        },
        nextPage: {
            href: Joi.string()
        }
    })
});

export const NewBookModel = Joi.object({
    title: Joi.string()
}).example({
    title: 'My First Digital Book'
});