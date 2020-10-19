'use strict';

import joiRouter from 'koa-joi-router';
const Joi = joiRouter.Joi;

// Let's use Joi to define what a book looks like
// In other words, let's model a book in our code
export const BookModel = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string()
});

// We can do the same with the List, reusing the 
// BookModel and adding our HATEOAS info
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