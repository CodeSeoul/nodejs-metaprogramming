'use strict';

/**
 * This is our controller function that is called
 * by the koa-joi-router. This contains the logic
 * to retrieve, format, and output information about
 * the books we want to display.
 * 
 * You'll notice the _links object in our book list.
 * This is part of HATEOAS - documenting how to navigate
 * our API within API responses.
 */
export function getBookList(ctx) {
    ctx.body = {
        books: [
            {
                id: 1,
                title: 'book!'
            }
        ],
        _links: {
            self: {
                href: "/books"
            },
            nextPage: {
                href: "/books?page=1"
            }
        }
    };
}

/**
 * Similarly to getBookList, this is used by the
 * router for creating books. Here you would want
 * to save information from the new book before
 * displaying it. For now, we just return the title
 * given.
 */
export async function createBook(ctx) {
    ctx.body = {
        id: 1,
        title: ctx.request.body.title
    };
}
