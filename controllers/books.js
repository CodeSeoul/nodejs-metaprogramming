'use strict';

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

export async function createBook(ctx) {
    ctx.body = {
        id: 1,
        title: ctx.request.body.title
    };
}
