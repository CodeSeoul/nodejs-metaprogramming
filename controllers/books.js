'use strict';

export async function getBookList(ctx) {
    const page = ctx.request.query.page;
    const offset = ctx.request.query.countPerPage * page;

    let results;
    try {
        [ results ] = await ctx.db.execute(
            'select id, title from books limit :page offset :offset',
            {
                page,
                offset
            });
    } catch(e) {
        ctx.throw(e);
    }

    const links = {
            self: {
            href: '/books'
        },
        nextPage: {
            href: `/books?page=${page+1}`
        }
    };

    if (page > 0) {
        links.prevPage = {
            href: `/books?page=${page-1}`
        };
    }

    ctx.body = {
        books: results,
        _links: links
    };
}

export async function createBook(ctx) {
    let results;
    try {
        [ results ] = await ctx.db.execute(
            'insert into books (title) values (:title)',
            {
                title: ctx.request.body.title
            }
            );
    } catch(e) {
        ctx.throw(e);
    }

    ctx.body = {
        id: results.insertId,
        title: ctx.request.body.title,
        _links: {
            self: {
               href: '/books'
            }
        }
    };
}
